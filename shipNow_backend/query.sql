SELECT
    d.dept_id,
    count() AS employeesNumber,
    sum(e.salary) AS sumSalary
FROM department as d
INNER JOIN employees as e
    ON e.dept_id = d.dept_id
GROUP BY d.dept_id
ORDER BY dept_id asc
