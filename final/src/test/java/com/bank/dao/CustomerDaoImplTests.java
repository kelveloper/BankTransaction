package com.bank.dao;

import com.bank.model.Account;
import com.bank.model.Customer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CustomerDaoImplTests {
    private JdbcTemplate jdbcTemplate;
    private CustomerDao customerDao;

    @Autowired
    public void CustomerDaoImplTest(JdbcTemplate jdbcTemplate){ // TODO: inject with JdbcTemplate jdbcTemplate
        this.jdbcTemplate = jdbcTemplate;
        //this.jdbcTemplate = jdbcTemplate;
        customerDao = new CustomerDaoImpl(jdbcTemplate);
    }
    @BeforeEach
    public void setUp() {
        List<Customer> customers = customerDao.getAllCustomers();
        for (Customer customer : customers) {
            customerDao.deleteCustomer(customer.getCustomerId());
        }
    }

    @Test
    @DisplayName("Add New Customer Test")
    public void addNewCustomerTests(){
        Customer customer = new Customer();
        customer.setFirstName("Selena");
        customer.setLastname("Gomez");
        customer.setEmail("Selenagomez@gmail.com");
        customer.setPhoneNumber("1234567890");
        customer.setBankPin("1234");
        customer.setBankName("Wells Fargo");
        customerDao.createNewCustomer(customer);
        List<Customer> newList = customerDao.getAllCustomers();
        assertNotNull(newList);
        assertEquals(1, newList.size());
    }
    @Test
    @DisplayName("Get a List of All Customers")
    public void getListOfAllCustomersTest(){
        Customer customer = new Customer();
        customer.setFirstName("Selena");
        customer.setLastname("Gomez");
        customer.setEmail("Selenagomez@gmail.com");
        customer.setPhoneNumber("1234567890");
        customer.setBankPin("1234");
        customer.setBankName("Wells Fargo");
        customerDao.createNewCustomer(customer);

        Customer customer2 = new Customer();
        customer2.setFirstName("Zayn");
        customer2.setLastname("Malik");
        customer2.setEmail("Zaynmalik@gmail.com");
        customer2.setPhoneNumber("13875489");
        customer2.setBankPin("1222");
        customer2.setBankName("Bank of America");
        customerDao.createNewCustomer(customer2);

        List<Customer> newList = customerDao.getAllCustomers();
        assertNotNull(newList);
        assertEquals(2, newList.size());
    }
    @Test
    @DisplayName("Find Employee by Id")
    public void findEmployeeById(){
        Customer customer = new Customer();
        customer.setFirstName("Michael");
        customer.setLastname("Jordan");
        customer.setEmail("MichaelJordan@gmail.com");
        customer.setBankPin("5678");
        customer.setPhoneNumber("1234567890");
        customer.setBankName("JP Morgan Chase");
        Customer getBackCustomer = customerDao.createNewCustomer(customer);
        Customer customerFoundById = customerDao.findCustomerById(getBackCustomer.getCustomerId());
        assertNotNull(customerFoundById);
        assertEquals("Michael", customerFoundById.getFirstName());
        assertEquals("Jordan", customerFoundById.getLastName());
        assertEquals("MichaelJordan@gmail.com", customerFoundById.getEmail());
        assertEquals("5678", customerFoundById.getBankPin());
        assertEquals("1234567890", customerFoundById.getPhoneNumber());
        assertEquals("JP Morgan Chase", customerFoundById.getBankName());


    }
    @Test
    @DisplayName("Update Customer Info")
    public void updateCustomerInfoTest(){
        Customer customer2 = new Customer();
        customer2.setFirstName("Zayn");
        customer2.setLastname("Malik");
        customer2.setEmail("Zaynmalik@gmail.com");
        customer2.setPhoneNumber("13875489");
        customer2.setBankPin("1222");
        customer2.setBankName("Bank of America");
        Customer getBackCustomer = customerDao.createNewCustomer(customer2);
        System.out.println("id of customer" + getBackCustomer.getCustomerId());

        Customer customer = new Customer();
        customer.setCustomerId(getBackCustomer.getCustomerId());
        customer.setFirstName("Jessica");
        customer.setLastname("Simpson");
        customer.setBankPin("3333");
        customer.setEmail("jessicasimpson@yaho.com");
        customer.setBankName("JP Morgan Chase");
        customerDao.updateCustomer(customer);

        Customer getCustomerById = customerDao.findCustomerById(getBackCustomer.getCustomerId());
        assertNotNull(getCustomerById);
        assertEquals("Jessica", getCustomerById.getFirstName());
        assertEquals("Simpson", getCustomerById.getLastName());
        assertEquals("3333", getCustomerById.getBankPin());
        assertEquals("jessicasimpson@yaho.com", getCustomerById.getEmail());
        assertEquals("JP Morgan Chase", getCustomerById.getBankName());

    }

    @Test
    @DisplayName("Delete Customer Test")
    @Transactional
    public void deleteCustomerTest(){
        Customer customer = new Customer();
        customer.setFirstName("Selena");
        customer.setLastname("Gomez");
        customer.setEmail("Selenagomez@gmail.com");
        customer.setPhoneNumber("1234567890");
        customer.setBankPin("1234");
        customer.setBankName("Wells Fargo");
        customerDao.createNewCustomer(customer);

        Customer customer2 = new Customer();
        customer2.setFirstName("Zayn");
        customer2.setLastname("Malik");
        customer2.setEmail("Zaynmalik@gmail.com");
        customer2.setPhoneNumber("13875489");
        customer2.setBankPin("1222");
        customer2.setBankName("Bank of America");
        Customer getBackCustomer = customerDao.createNewCustomer(customer2);

        customerDao.deleteCustomer(getBackCustomer.getCustomerId());
        assertNotNull(customerDao.getAllCustomers());
        assertEquals(1, customerDao.getAllCustomers().size());
    }


}
