DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'exchange') THEN
    INSERT INTO public.exchange (name, "amountUSD", description) VALUES
 			('Dólar estadounidense', 1.00, 'USD'),
            ('Peso mexicano', 20.00, 'MXN'),
            ('Euro', 0.85, 'EUR'),
            ('Libra esterlina', 0.72, 'GBP'),
            ('Yen japonés', 109.63, 'JPY'),
            ('Dólar canadiense', 1.25, 'CAD'),
            ('Dólar australiano', 1.29, 'AUD'),
            ('Franco suizo', 0.92, 'CHF'),
            ('Yuan chino', 6.47, 'CNY'),
            ('Dólar neozelandés', 1.35, 'NZD');
    END IF;
END $$;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_type') THEN
        INSERT INTO public.user_type (description) VALUES
            ('Guest'),
            ('Worker'),
            ('Employer');
    END IF;
END $$;
