import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Minor() {
    const [iname, setIname] = useState("");
    const [text, setText] = useState("Select The value");
    const [quantity, setQuantity] = useState(1);
    const [card, setCard] = useState([]);

    const items = {
        "Pointer": 200,
        "Keyboard": 150,
        "Mouse": 100,
        "Monitor": 2000,
    };

    const handleItemChange = (e) => {
        const selectedItem = e.target.value;
        setIname(selectedItem);
        setText(items[selectedItem]);
    };

    const AddCard = () => {
        let dis;
        if (!iname) return;
        let di=quantity*text;
        if(di>5000){
            dis=40;
        }
        else if(di>4000 && di<=5000){
            dis=25;
        }
        else if(di>3000 && di<=4000){
            dis=20;
        }
        else if(di>2000 && di<=3000){
            dis=15;
        }
        else if(di>1000 && di<=2000){
            dis=10;
        } 
        else if(di>500 && di<=1000){
                dis=5;
        }
        else if(di>=300 && di<=500){
                dis=3;
        }
        else {
            dis=0;
        }
        setCard(prevCard =>{
            let updated = false;
            let newCard = prevCard.map(item => {
                if (item.name === iname) {
                    updated = true;
                    return { ...item, qn:eval(item.qn + +quantity) }; 
                }
                return item;
            });
    
            return updated ? newCard : [...prevCard, { name: iname, qn: quantity, discount:dis, rate: text }]
        });
            setIname("");
            setQuantity(1);
            setText("Select The value");
       };
    let a=0;
    return (
        <div className="container mt-4 p-4 border rounded shadow bg-light">
            <h3 className="text-center mb-3">Product Selection</h3>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Select Item</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <select className="form-select" onChange={handleItemChange} value={iname}>
                                    <option value="">Select Item</option>
                                    {Object.keys(items).map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select className="form-select" onChange={(e)=>setQuantity(e.target.value)} value={quantity} >
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <input type="text" className="form-control" readOnly value={text} />
                            </td>
                            <td>
                                <button className="btn btn-primary" onClick={AddCard}>
                                    Add
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <br />

           { (card.length>=1) && <div className="border rounded p-3 bg-white">
                <h4 className="text-center mb-3">Added Products</h4>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Sr No.</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Rate</th>
                                <th>Total</th>
                                <th>Discount%</th>
                                <th>Total-Discount</th>
                                <th>Net Amount</th>

                            </tr>
                        </thead>
                        <tbody>
                        
                            {card.map((item, i) => {
                          let adis=(((item.qn * item.rate)*item.discount)/100).toFixed(0);
                          let atadis=+((item.qn * item.rate)-adis);
                         a+=atadis;
                                return(
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td><strong>{(item.name).toUpperCase()}</strong></td>
                                    <td>{item.qn}</td>
                                    <td>{item.rate}</td>
                                    <td>{item.qn * item.rate}</td>
                                    <th>{item.discount}</th>
                                    <td>{adis}</td>
                                    <td>{atadis}</td>
                                    
                                </tr>
                                )
                            })}
                            <tr>
                                <th style={{textAlign:'center'}} colSpan="7">Total Amount To Pay</th>
                                <th>{a}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
           }
        </div>
    );
}

export default Minor;
