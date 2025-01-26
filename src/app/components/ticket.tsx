'use client';
/* eslint-disable */
import { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Grid from '@mui/material/Grid2';

export default function Ticket(props: any) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [newData, setNewData] = useState({
    patronName: "",
    eventName:"",
    type: "",
    price: "",
    cat: "",
    section: "",
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
            const response = await fetch("https://api.ticketrecipe.com/v1/certify/tickets",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            "requestId": "80670583-ceb1-4b7f-bc12-0ce6e8be967b",
                            "purchaser": {
                                "name": props.data.patronName,
                                "emailAddress": "test@gmail.com"
                            },
                            "eventId": props.data.eventID,
                            "eventName": props.data.eventName,
                            "eventDateTime": props.data.eventDateTime,
                            "venue": {
                                "name": props.data.eventVenue,
                                "address": props.data.eventAddress
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
                                    "section": props.data.section,
                                    "type": props.data.type
                                }
                            ]
                        })
                }
            );
            const d = await response.json();
            if(d && d.data && d.data.length > 0){
                if(d.data[0].getCertifyQrCode){
                    setBarcode(d.data[0].getCertifyQrCode);
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
                <div className={'header-left'}><img src={'./tp.png'}/></div>
                <div className={'header-right'}>Booking: {newData.bid}</div>
        </div>
        <div className={'body'}>
            <div className="row">
                <div className={'body-left'}>
                    <div className={'body-thumbsec'}>
                            <img src={props.data.bannerImageUrl} width={100}/>
                            <span className={'body-thumbsec-right'}>
                                <h4>{newData.eventName}</h4>
                                <div className={'cal'}><img src={'./calendar.png'}/><p>Nov 11 at 17:10 SGT </p></div>
                                <div className={'loc'}><img src={'./locate.png'}/><p>{props.data.eventVenue}</p></div>
                                
                            </span>
                            
                    </div>
                    <Grid container spacing={2}>
                        <Grid size={4}>
                            <div className={'tbl-cell'}>
                                <div className={'tbl-label'}>Type</div>
                                <div className={'tbl-val'}>{newData.type}</div>
                            </div>
                        </Grid>
                        <Grid size={4}>
                            <div className={'tbl-cell'}>
                                <div className={'tbl-label'}>Ticket Price</div>
                                <div className={'tbl-val'}>{newData.currency + " " + newData.price}</div>
                            </div>
                        </Grid>
                        <Grid size={4}>
                            <div className={'tbl-cell'}>
                                <div className={'tbl-label'}>Category</div>
                                <div className={'tbl-val'}>{newData.cat}</div>
                            </div>
                        </Grid>
                        <Grid size={4}>
                            <div className={'tbl-cell'}>
                                <div className={'tbl-label'}>Section</div>
                                <div className={'tbl-val'}>{newData.section}</div>
                            </div>
                        </Grid>
                        <Grid size={4}>
                            <div className={'tbl-cell'}>
                                <div className={'tbl-label'}>Row</div>
                                <div className={'tbl-val'}>{newData.row}</div>
                            </div>
                        </Grid>
                        <Grid size={4}>
                            <div className={'tbl-cell'}>
                                <div className={'tbl-label'}>Seats</div>
                                <div className={'tbl-val'}>{newData.seats}</div>
                            </div>
                        </Grid>
                        <Grid size={4}>
                            <div className={'tbl-cell'}>
                                <div className={'tbl-label'}>Entrance</div>
                                <div className={'tbl-val'}>{newData.entrance}</div>
                            </div>
                        </Grid>
                        <Grid size={4}>
                            <div className={'tbl-cell'}>
                                <div className={'tbl-label'}>Patron</div>
                                <div className={'tbl-val'}>{newData.patronName}</div>
                            </div>
                        </Grid>
                        
                    </Grid>

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