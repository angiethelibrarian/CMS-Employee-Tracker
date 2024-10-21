insert into department(id,name) values(1,'HR');
insert into department(id,name) values(2,'Engineering');

insert into role(id,title,salary,department_id) values(1,'Manager',90000,1);
insert into role(id,title,salary,department_id) values(2,'Business Partner',80000,1);
insert into role(id,title,salary,department_id) values(3,'QA Lead',80000,2);

insert into employee(id,first_name,last_name,role_id,manager_id) values(1,'Toby','Flenderson',1,NULL);
insert into employee(id,first_name,last_name,role_id,manager_id) values(2,'Luis','Lopez',2,1);
insert into employee(id,first_name,last_name,role_id,manager_id) values(3,'Creed','Bratton',3,1);