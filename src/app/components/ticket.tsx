'use client';
/* eslint-disable */
import { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";

export default function Ticket(props: any) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [newData, setNewData] = useState({
    pname: "",
    eventName:"",
    type: "",
    price: "",
    cat: "",
    sec: "",
    row: "",
    seats:"",
    entrance:"",
    bid: '',
    currency:"" 
  });

  const [barcode, setBarcode] = useState('')

  useEffect(() => { 
    
    props.data && setNewData(props.data);
    /*
     * API call to create QR COde
     */
    const generateQRCode = async () => {
            const response = await fetch("http://ticketrecipe-demo.us-west-2.elasticbeanstalk.com:8080/v1/certify/tickets",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "requestId": "64670583-ceb1-4b7f-bc12-0ce6e8be967b",
                        "purchaser": {
                            "name": props.data.pname,
                            "emailAddress": "test@gmail.com"
                        },
                        "eventId": props.data.eventID,
                        "eventName": props.data.eventName,
                        "startDateTime": "2025-09-18T20:00:00",
                        "venue": {
                            "name": "Madison Square Garden",
                            "address": "7th Ave & 32nd Street"
                        },
                        "tickets": [
                            {
                                "price": {
                                    "amount": parseInt(props.data.price),
                                    "currency": props.data.currency
                                },
                                "barcodeId": props.data.bid,
                                "entrance": props.data.entrance,
                                "category": props.data.cat,
                                "row": props.data.row,
                                "seat": props.data.seats,
                                "section": props.data.sec,
                                "type": props.data.type

                            }
                        ]
                    })
                }
            );
            const data = await response.json();
            if(data && data.qrCodes && data.qrCodes.length > 0){
                if(data.qrCodes[0].qrCodeImage){
                    setBarcode(data.qrCodes[0].qrCodeImage);
                }
            }

        };
        generateQRCode();

    },[])
  
  const onresetbtn = () => {
    props.resetData && props.resetData(true);
  }  

  return (
    <>
     <button onClick={() => reactToPrintFn()} className={'printbtn'}>PRINT</button>
     <button onClick={onresetbtn} className={'resetbtn'}>RESET</button>
      <div ref={contentRef} className={'ticketrecipe-body'}>
        <div className={'header'}>
                <div className={'header-left'}><img src={'./tm.png'}/></div>
                <div className={'header-right'}>Booking: {newData.bid}</div>
        </div>
        <div className={'body'}>
            <div className="row">
                <div className={'body-left'}>
                    <div className={'body-thumbsec'}>
                            <img src={'./ticket-img.png'}/>
                            <span className={'body-thumbsec-right'}>
                                <h4>{newData.eventName}</h4>
                                <div className={'cal'}><img src={'./calendar.png'}/><p>Nov 11 at 17:10 SGT </p></div>
                                <div className={'loc'}><img src={'./locate.png'}/><p>Singapore National Stadium</p></div>
                                
                            </span>
                            
                    </div>

                    <div id="resp-table">
                        <div id="resp-table-body">
                            <div className="resp-table-row st"> 
                                <div className="table-body-cell">
                                    Type
                                </div>
                                <div className="table-body-cell">
                                    Original Price
                                </div>
                                <div className="table-body-cell">
                                    Category
                                </div>
                            </div>
                            <div className="resp-table-row"> 
                                <div className="table-body-cell">
                                   {newData.type}
                                </div>
                                <div className="table-body-cell">
                                    {newData.currency + " " + newData.price}
                                </div>
                                <div className="table-body-cell">
                                    {newData.cat}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="resp-table">
                        <div id="resp-table-body">
                            <div className="resp-table-row st"> 
                                <div className="table-body-cell">
                                    Section
                                </div>
                                <div className="table-body-cell">
                                    Row
                                </div>
                                <div className="table-body-cell">
                                    Seats
                                </div>
                            </div>
                            <div className="resp-table-row"> 
                                <div className="table-body-cell">
                                    {newData.sec}
                                </div>
                                <div className="table-body-cell">
                                    {newData.row} 
                                </div>
                                <div className="table-body-cell">
                                    {newData.seats}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="resp-table">
                        <div id="resp-table-body">
                            <div className="resp-table-row st"> 
                                <div className="table-body-cell">
                                    Entrance
                                </div>
                                <div className="table-body-cell">
                                    Patron
                                </div>
                            </div>
                            <div className="resp-table-row"> 
                                <div className="table-body-cell">
                                    {newData.entrance}
                                </div>
                                <div className="table-body-cell">
                                    {newData.pname}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className={'body-right'}>
                        <div className={'barcode'}><img src={barcode ? barcode : './sample02.png'}/></div>
                        <div className={'barcode-guide'}>
                            <h4>Step to Verify</h4>
                            <ul className={'steps'}>
                                <li>1. Download TicketReceipt App</li>
                                <li>2. Open TicketReceipt App</li>
                                <li>3. Tap Scan</li>
                                <li>4. Scan your ticket QR code</li>
                            </ul>
                        </div>
                </div>
            </div>


            <div className={'body-bottom'}>
                <h5>Notice</h5>
                <p>Gates open at 4:00pm | No re-entry allowed|Arrive early for security checks | No outside F&B allowed|No admission for children aged below 3 years old|No professional photo, video cameras or live streaming allowed</p>
            </div>

            <div className={'body-extension'}>
                <h5>The standard Lorem Ipsum passage, used since the 1500s</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h5>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h5>The standard Lorem Ipsum passage, used since the 1500s</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h5>1914 translation by H. Rackham</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>

        </div>

      </div>
    </>
  );
}