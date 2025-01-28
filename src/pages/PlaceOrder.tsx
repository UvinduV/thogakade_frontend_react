import {useDispatch, useSelector} from "react-redux";
import {CustomerModel} from "../models/CustomerModel.ts";

function PlaceOrder() {

  const dispatch = useDispatch();
  const customers = useSelector(state => state.customers);
  return (
      <div>
          PlaceOrder
        {customers.map((customer: CustomerModel) => (<div key={customer.email}>{customer.name + ' '+ customer.nic + ' '+ customer.email+ ' '+customer.phone }</div>))}

      </div>
  )


}

export default PlaceOrder