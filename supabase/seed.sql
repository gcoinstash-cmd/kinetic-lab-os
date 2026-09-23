-- KINETIC LAB — Seed Data for Biomechanics & Sprint Testing OS
-- Preloaded with elite athlete rosters and force sensor runs

insert into public.athlete_profiles (id, full_name, email, phone, discipline, team_organization, event_position, top_speed_mph, ten_yard_split, reactive_strength_index)
values
  ('e1111111-1111-1111-1111-111111111111', 'Christian Coleman Jr.', 'coleman@teamusatrack.org', '+1 310 555 0142', 'sprint', 'Team USA Track', '100m Dash Specialist', 27.40, '1.42s', 3.42),
  ('e2222222-2222-2222-2222-222222222222', 'DeMarcus Vance', 'vance@buckeyes.edu', '+1 614 555 8891', 'football', 'Ohio State WR', 'Slot Receiver (NFL Combine)', 24.80, '1.48s', 3.18),
  ('e3333333-3333-3333-3333-333333333333', 'Kylian Ward', 'ward@arsenal.co.uk', '+44 20 7619 5000', 'soccer', 'Arsenal FC Academy', 'Winger (Maximum Sprint Velocity)', 25.10, '1.46s', 3.25)
on conflict (id) do nothing;

insert into public.biomechanical_assessments (id, ticket_id, athlete_id, protocol_title, protocol_category, assessment_date, time_slot, status, fee, asymmetry_index_pct, lead_biomechanist, testing_chamber, notes)
values
  ('f1111111-1111-1111-1111-111111111111', 'KNT-9502', 'e1111111-1111-1111-1111-111111111111', 'Dual Force Plate Asymmetry & Ground Contact Audit', 'force_plate', '2026-09-24', '09:00 AM', 'in_progress', 280.00, 2.4, 'Elena Rostova', 'Force Sensor Runway (Dual 1000Hz Decks)', 'Right hip power leak during 40m upright transition.'),
  ('f2222222-2222-2222-2222-222222222222', 'KNT-4108', 'e2222222-2222-2222-2222-222222222222', 'Combine 40-Yard Sprint Acceleration Lab', 'velocity', '2026-09-25', '11:30 AM', 'inspection', 650.00, 1.8, 'Coach Vince Tyler', 'Optojump Laser Lane #2', 'Targeting sub-4.40s combine 40-yard dash.'),
  ('f3333333-3333-3333-3333-333333333333', 'KNT-7721', 'e3333333-3333-3333-3333-333333333333', 'High-Speed Markerless Biomechanics Kinematics', 'biomechanics', '2026-09-26', '02:00 PM', 'quality_check', 799.00, 3.1, 'Dr. Aris Thorne', 'Sprint Chamber Alpha (8-Cam Array)', 'Full multi-angle kinematic review for technical coaching staff.')
on conflict (id) do nothing;

insert into public.force_plate_runs (id, assessment_id, trial_number, peak_grf_newtons, ground_contact_time_ms, eccentric_impulse_ns, limb_asymmetry_pct, is_personal_record)
values
  ('g1111111-1111-1111-1111-111111111111', 'f1111111-1111-1111-1111-111111111111', 1, 2840.5, 92, 420.50, 2.8, false),
  ('g2222222-2222-2222-2222-222222222222', 'f1111111-1111-1111-1111-111111111111', 2, 2980.0, 88, 445.20, 2.1, true),
  ('g3333333-3333-3333-3333-333333333333', 'f2222222-2222-2222-2222-222222222222', 1, 2650.0, 104, 390.10, 1.8, false)
on conflict (id) do nothing;

insert into public.lab_billing_retainers (id, organization_name, tier, contract_valuation, status, contract_end)
values
  ('h1111111-1111-1111-1111-111111111111', 'Team USA Track & Field', 'Pro Squad Retainer', 48000.00, 'Active Cycle', '2027-08-31'),
  ('h2222222-2222-2222-2222-222222222222', 'Ohio State Athletic Dept', 'Combine Cohort', 24500.00, 'Escrow Funded', '2027-04-30')
on conflict (id) do nothing;
