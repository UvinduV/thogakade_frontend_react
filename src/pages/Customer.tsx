import {useEffect, useState} from "react"
import { Trash2 } from "react-feather"
import {useDispatch, useSelector} from "react-redux";
import {
  addCustomer,
  deleteCustomer,
  getCustomers,
  saveCustomer,
  updateCustomer,
  updatedCustomer
} from "../reducers/CustomerSlice.ts";
import {CustomerModel} from "../models/CustomerModel.ts";
import {AppDispatch} from "../store/Store.ts";

function Customer() {
  // const [customers, setCustomers] = useState([
  //   {
  //     id: "C001",
  //     name: "John Doe",
  //     nic: "123456789V",
  //     email: "john@example.com",
  //     phone: "1234567890"
  //   },
  //   {
  //     id: "C002",
  //     name: "Jane Smith",
  //     nic: "987654321X",
  //     email: "jane@example.com",
  //     phone: "0987654321"
  //   }
  // ])
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector(state => state.customers);

  useEffect(() => {
    dispatch(getCustomers());
    }, [dispatch]);

  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [nic, setNic] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const handleAdd = () => {
    if (!name || !nic || !email || !phone) {
      alert("All fields are required!")
      return
    }
    // setCustomers([...customers, { id, name, nic, email, phone }])
    const newCustomer = new CustomerModel(name, nic, email, phone);
    // dispatch(addCustomer(newCustomer));
    dispatch(saveCustomer(newCustomer));
    alert("customer added successfully!")

    resetForm();

  }

  const handleEdit = (customer: CustomerModel) => {
    // setId(customer.id)
    setName(customer.name)
    setNic(customer.nic)
    setEmail(customer.email)
    setPhone(customer.phone)
    setIsEditing(true)
  }

  const handleUpdate = () => {
    if (!id || !name || !nic || !email || !phone) {
      alert("All fields are required!")
      return
    }
    const updateCust = new CustomerModel(name, nic, email, phone);
    //dispatch(updateCustomer(updateCust));
    dispatch(updatedCustomer(email,updateCust));
    alert("Successfully Updated");
    // setCustomers(
    //   customers.map((customer) =>
    //     customer.id === id ? { id, name, nic, email, phone } : customer
    //   )
    // )
    resetForm();
  }

  const handleDelete = (customerEmail: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      // setCustomers(customers.filter((customer) => customer.id !== customerId))
      dispatch(deleteCustomer(customerEmail));
    }
  }

  const resetForm = () => {
    setId("")
    setName("")
    setNic("")
    setEmail("")
    setPhone("")
    setIsEditing(false)
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="nic"
          placeholder="NIC"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex justify-end">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white p-2 rounded mr-2"
          >
            Add
          </button>
        )}
        {isEditing && (
          <button
            onClick={resetForm}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
      <table className="min-w-full table-auto border-collapse mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">NIC</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer: CustomerModel) => (
            <tr
              key={customer.email}
              onClick={() => handleEdit(customer)}
              className="hover:cursor-pointer hover:bg-slate-600 hover:text-white"
            >
              <td className="border px-4 py-2">{customer.id}</td>
              <td className="border px-4 py-2">{customer.name}</td>
              <td className="border px-4 py-2">{customer.nic}</td>
              <td className="border px-4 py-2">{customer.email}</td>
              <td className="border px-4 py-2">{customer.phone}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(customer.email)}
                  className="bg-red-500 text-white p-2 rounded-lg"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Customer
