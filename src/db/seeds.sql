INSERT INTO department (name)
VALUES  ('Coding'),
        ('Art'),
        ('Music'),
        ('Publishing');

INSERT INTO role (title, salary, department_id)
VALUES  ('Lead Dev', 100000, 1),
        ('Lead Artist', 110000, 2),
        ('Lead Musician', 95000, 3),
        ('Publisher', 95000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Fayton', 'Ryde', 1, NULL),
        ('Silto', 'Teach', 2, 1),
        ('Mintront', 'Cobbal', 3, NULL),
        ('Avey', 'Cobbal', 4, NULL);