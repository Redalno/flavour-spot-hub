
-- Roles enum + table
CREATE TYPE public.app_role AS ENUM ('admin', 'manager', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Security definer role checker
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Reservations table
CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  guests INTEGER NOT NULL CHECK (guests >= 1 AND guests <= 30),
  special_request TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.reservations TO authenticated;
GRANT INSERT ON public.reservations TO anon;
GRANT ALL ON public.reservations TO service_role;

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Anyone can create a reservation request
CREATE POLICY "Anyone can submit a reservation"
  ON public.reservations FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 100
    AND length(email) BETWEEN 3 AND 255
    AND length(phone) BETWEEN 5 AND 30
    AND (special_request IS NULL OR length(special_request) <= 1000)
  );

-- Only managers/admins can view, update, delete
CREATE POLICY "Managers can view reservations"
  ON public.reservations FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'manager') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Managers can update reservations"
  ON public.reservations FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'manager') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Managers can delete reservations"
  ON public.reservations FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'manager') OR public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_reservations_date ON public.reservations (reservation_date, reservation_time);
CREATE INDEX idx_reservations_status ON public.reservations (status);
