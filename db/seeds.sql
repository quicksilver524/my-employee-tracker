INSERT INTO department(department_name)
VALUES 
('Seahorse'),
('Top'),
('Bottom'),
('Receiver'),
('Switch');

INSERT INTO roles(title, salary, department_id)
VALUES
('Seahorse Manager', 1000000, 1),
('Top Manager', 40000, 2),
('Bottom Manager', 35000, 3),
('Receiver', 23000, 4),
('Switch Manager', 58000, 5); 

INSERT INTO employee(first_name, last_name, roles_id, manager_id)
VALUES
('Charissa', 'Varchar', '1', '1'),
('Courtney', 'Buttmuncher', '1', '1'),
('Jonathan', 'Yo', '5', '5'),
('Jenny', 'Woo', '4', '4'),
('Duyen', 'Nguyen', '3', '3'),
('Gus', 'Gus','1', '1'),
('Sea', 'Horse','2', '2');