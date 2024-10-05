import React, { useState } from 'react';

const LongForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, you can send data to the server here
    console.log(formData);
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label fs-4">First Name:</label>
              <input type="text" className="form-control form-control-lg" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label fs-4">Last Name:</label>
              <input type="text" className="form-control form-control-lg" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            {/* Add more fields for step 1 */}
          </div>
        );
      case 2:
        return (
          <div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fs-4">Email:</label>
              <input type="email" className="form-control form-control-lg" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label fs-4">Phone:</label>
              <input type="tel" className="form-control form-control-lg" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            {/* Add more fields for step 2 */}
          </div>
        );
      case 3:
        return (
          <div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label fs-4">Address:</label>
              <input type="text" className="form-control form-control-lg" id="address" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label fs-4">City:</label>
              <input type="text" className="form-control form-control-lg" id="city" name="city" value={formData.city} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="state" className="form-label fs-4">State:</label>
              <input type="text" className="form-control form-control-lg" id="state" name="state" value={formData.state} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="zip" className="form-label fs-4">ZIP:</label>
              <input type="text" className="form-control form-control-lg" id="zip" name="zip" value={formData.zip} onChange={handleChange} />
            </div>
            {/* Add more fields for step 3 */}
          </div>
        );
      // Add more cases for additional steps
      default:
        return null;
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit}>
        {renderFormStep()}
        <div className="mb-3">
          {step > 1 && <button type="button" className="btn btn-secondary me-2" onClick={handleBack}>Back</button>}
          {step < 3 && <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>}
          {step === 3 && <button type="submit" className="btn btn-success">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default LongForm;

