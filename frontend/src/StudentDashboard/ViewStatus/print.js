import "../../styles/Print.css";
import "../../styles/Registration.css";
import ajax from '../../services/fetchService';
import { useState, useEffect, useRef } from 'react';
import { useUser } from '../../UserProvider/index';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../header/Header";
import Loader from "../../components/Loader";
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from 'react-bootstrap';
import muLogo from "../../images/mekelle.png"; // Import the university logo
import {jwtDecode} from "jwt-decode"
const Print = () => {
    const user = useUser();
    const [clearanceRequest, setClearanceRequest] = useState('');
    const [responsesData, setResponsesData] = useState('');
    const [responses, setResponses] = useState([]);
// Inside your print component
const requestId = window.location.href.split("/print/")[1];
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const responseDetailsRef = useRef();
    const qrCodeRef = useRef();
    const [logoBase64, setLogoBase64] = useState('');
      const decoded_jwt = jwtDecode(user.jwt);
       //console.log(decoded_jwt.sub);
    // Convert logo to Base64 when the component mounts
    useEffect(() => {
        const toBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        };

        fetch(muLogo)
            .then((res) => res.blob())
            .then((blob) => toBase64(blob))
            .then((base64) => setLogoBase64(base64))
            .catch((error) => console.error("Error loading logo:", error));
    }, []);

    useEffect(() => {
        setIsLoading(true);
        ajax(`/api/requests/${requestId}`, "GET", user.jwt).then((data) => {
            setClearanceRequest(data);
        
            setIsLoading(false);
        });
    }, [requestId, user.jwt]);

    useEffect(() => {
        setIsLoading(true);
        ajax(`/api/responses/details/${requestId}`, 'GET', user.jwt).then((data) => {
            console.log(data);
            setResponsesData(data);
            setIsLoading(false);
        });
    }, [user.jwt]);

    useEffect(() => {
        let copyData = [];
        if (responsesData) {
            copyData = [
                responsesData.find(response => response.position === 'ROLE_DEPARTMENT_HEAD'),
                responsesData.find(response => response.position === 'ROLE_LIBRARY'),
                responsesData.find(response => response.position === 'ROLE_CAFETERIA'),
                responsesData.find(response => response.position === 'ROLE_PROCTOR'),
                clearanceRequest?.requestedReason === '"Id Replacement"' && 
                    responsesData.find(response => response.position === 'ROLE_CAMPUS_POLICE'),
                clearanceRequest?.requestedReason === '"Withdrawal"' && 
                    responsesData.find(response => response.position === 'ROLE_COLLEGE_DEAN'),
                responsesData.find(response => response.position === 'ROLE_REGISTRAR')
            ].filter(Boolean);
        }
        setResponses(copyData);
    }, [responsesData, clearanceRequest]);

    const ResponseFormatter = (col) => (
        <tr>
            <td><label className="labelM fullName">{col.col1}</label></td>
            <td><label className="labelM">{col.col2}</label></td>
            <td><label className="labelM fullName">{col.col3}</label></td>
            <td>
                <b>
                    <label className="labelM" style={{ color: col.col4 === 'rejected' ? '#ff0000' : '#00ff00' }}>
                        {col.col4}
                    </label>
                </b>
            </td>
        </tr>
    );

    const ResponseDetails = () => (
        <div className="detail" ref={responseDetailsRef}>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th className="fullName">No</th>
                            <th>Staff</th>
                            <th className="fullName">Full name</th>
                            <th>Accepted date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responses.map((response, index) => (
                            <ResponseFormatter
                                key={index}
                                col1={index + 1}
                                col2={
                                    response.position === 'ROLE_DEPARTMENT_HEAD' ? 'Department Head' :
                                    response.position === 'ROLE_LIBRARY' ? 'Library Circulation' :
                                    response.position === 'ROLE_CAFETERIA' ? 'Student Cafeteria' :
                                    response.position === 'ROLE_PROCTOR' ? 'Proctor' :
                                    response.position === 'ROLE_CAMPUS_POLICE' ? 'Campus Police' :
                                    response.position === 'ROLE_COLLEGE_DEAN' ? 'College Dean' : 'Registrar'
                                }
                                col3={`${response.fname} ${response.mname}`}
                                col4={response.responseDate}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const handlePrint = () => {
        const qrCanvas = qrCodeRef.current?.querySelector('canvas');

        if (qrCanvas) {
            const qrDataURL = qrCanvas.toDataURL('image/png');
            if (!qrDataURL || qrDataURL === "data:,") {
                console.error("QR code data URL is empty.");
                return; // Prevent printing if the QR code is empty
            }

            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Clearance Details</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            .fullName { font-weight: bold; }
                            .qrCodeContainer { margin-top: 20px; text-align: center; }
                            .logoContainer { text-align: center; margin-bottom: 20px; }
                            .logo { width: 200px; }
                            .table-container { display: flex; justify-content: center; }
                            table { width: auto; margin: 10px 0; background-color: #ccccff; border-collapse: collapse; }
                            th, td { padding: 8px 12px; border: 1px solid #ccc; font-size:0.5rem !important }
                            h2{text-align:center;}
                        </style>
                    </head>
                    <body>
                        <div class="logoContainer">
                            <img src="${logoBase64}" alt="Mekelle University Logo" class="logo" />
                        </div>

                        <h2>Mekelle University Student Clearance</h2>
                        <div class="detail">${responseDetailsRef.current.innerHTML}</div>
                     <div class="qrCodeContainer">
    <h4>Clearance QR Code:</h4>
    <img src="${qrDataURL}" alt="Clearance QR Code" style="width: 100px; height: 100px;" /> <!-- Set desired width and height -->
</div>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        } else {
            console.error("QR code is not ready yet.");
        }
    };

    return (
        <div className="print-container">
            <Header />
            {isLoading && <Loader />}
            {clearanceRequest ? (
                <>
                    <ResponseDetails />
                    <div className="qrCodeContainer" ref={qrCodeRef}>
                        <QRCodeCanvas value={decoded_jwt.sub+"\n clearance ID:"+clearanceRequest.id} />
                    </div>
                    <div className="print-buttons" style={{ textAlign: 'center' }}>
                        <Button
                            size="lg"
                            variant="secondary"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>
                        <Button onClick={handlePrint} size="lg" variant="success">
                            Print
                        </Button>
                    </div>
                </>
            ) : (
                <div>You don't have any clearance Request!</div>
            )}
        </div>
    );
};

export default Print;
