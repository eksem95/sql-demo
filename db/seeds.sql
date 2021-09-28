INSERT INTO department (id, name)
VALUES  (110, "all"),
        (111, "clothing"),
        (112, "grocery"),
        (113, "home");

INSERT INTO roles (id, title, department_id)
VALUES  (01, "stock", 110),
        (02, "inventory", 110),
        (03, "cashier", 110),
        (04, "fittingRoom", 111),
        (05, "decorator", 113),
        (06, "manager", 111),
        (07, "manager", 112),
        (08, "manager", 113),
        (09, "manager", 110);


INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES  (01, "Joe", "Hardy", 06, 05),
        (02, "Gary", "Lee", 07, 05),
        (03, "Sue", "Collins", 05, null),
        (04, "Stacy", "Gray", 02, 05),
        (05, "Barry", "Vars", 09, null),
        (06, "Betty" "Johnson", 04, 01);