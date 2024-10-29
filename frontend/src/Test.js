import { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodePrint = () => {
  const canvasRef = useRef(); // Ref for the QR code canvas
  const [data, setData] = useState('');
  const shoma="shoma";

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const content = `
      <html>
        <head>
          <title>Print QR Code</title>

          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h1, p {
              margin: 10px 0;
            }
            img {
              margin-top: 20px; /* Adjust margin for image */
            }
          </style>
        </head>
        <body>
          <h1 style="color:red;">QR Code</h1>
          <p id="hola">This is the QR code to print.</p>
          <img src="${canvasRef.current ? canvasRef.current.toDataURL() : ''}" alt="QR Code" />
           <script>
             console.log(shoma);
             window.alert("shoma");
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <main>
        <div>
          <h1 style={{ color: 'red' }}>QR Code Generator</h1>
          <p>This is the QR code to print.</p>
          <input 
            type="text" 
            value={data} 
            onChange={(e) => setData(e.target.value)} 
            placeholder="Enter data for QR Code"
          />
          {/* Use QRCodeCanvas to generate the QR code */}
          <QRCodeCanvas ref={canvasRef} value={data} />
        </div>

        <button onClick={handlePrint} disabled={!data}>Print</button>
      </main>
    </>
  );
};

export default QRCodePrint;
