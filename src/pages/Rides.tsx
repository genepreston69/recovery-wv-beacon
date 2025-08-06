import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Phone } from 'lucide-react';

const Rides = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    medicaidId: '',
    requestDate: '',
    appointmentDate: '',
    appointmentTime: '',
    pickupName: '',
    pickupPhone: '',
    pickupAddress: '',
    destName: '',
    destPhone: '',
    destAddress: '',
    additionalInfo: ''
  });

  useEffect(() => {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, requestDate: today }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 6) {
      return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6,10)}`;
    } else if (cleaned.length >= 3) {
      return `(${cleaned.slice(0,3)}) ${cleaned.slice(3)}`;
    }
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, [e.target.name]: formatted }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'requestDate', 'appointmentDate', 'appointmentTime', 'pickupAddress', 'destName', 'destAddress'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData].trim());
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields marked with *",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the form data to your server
    toast({
      title: "Request Submitted",
      description: "Transportation request submitted successfully! We will contact you within 24 hours to confirm your ride details.",
    });

    // Optional: Reset form after successful submission
    // setFormData({ ... reset to initial state });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl">
            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <div className="text-center">
                <CardTitle className="text-3xl font-semibold mb-2">Transportation Request</CardTitle>
                <p className="text-lg opacity-90 mb-4">Recovery is Possible - We're Here to Help You Get There</p>
                <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 inline-flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">🆘 Need Help Now? Crisis Line: (304) 523-HOPE (4673)</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              {/* Important Notice */}
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4 mb-8">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700">
                      <strong>Important:</strong> Please submit your transportation request at least 24 hours in advance when possible. All rides are subject to availability and our service area.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-100 pb-2">
                    Personal Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder="(304) 555-0123"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="medicaidId">Medicaid ID Number</Label>
                      <Input
                        id="medicaidId"
                        name="medicaidId"
                        value={formData.medicaidId}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="requestDate">Today's Date <span className="text-red-500">*</span></Label>
                      <Input
                        id="requestDate"
                        name="requestDate"
                        type="date"
                        value={formData.requestDate}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Appointment Information Section */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-100 pb-2">
                    Appointment Details
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="appointmentDate">Appointment Date <span className="text-red-500">*</span></Label>
                      <Input
                        id="appointmentDate"
                        name="appointmentDate"
                        type="date"
                        value={formData.appointmentDate}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="appointmentTime">Appointment Time <span className="text-red-500">*</span></Label>
                      <Input
                        id="appointmentTime"
                        name="appointmentTime"
                        type="time"
                        value={formData.appointmentTime}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Pickup Location Section */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-100 pb-2">
                    Pickup Location
                  </h2>
                  
                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <Label htmlFor="pickupName">Location/Facility Name</Label>
                        <Input
                          id="pickupName"
                          name="pickupName"
                          value={formData.pickupName}
                          onChange={handleInputChange}
                          placeholder="e.g., Home, Recovery Center, etc."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pickupPhone">Location Phone Number</Label>
                        <Input
                          id="pickupPhone"
                          name="pickupPhone"
                          type="tel"
                          value={formData.pickupPhone}
                          onChange={handlePhoneChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="pickupAddress">Pickup Address <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="pickupAddress"
                        name="pickupAddress"
                        value={formData.pickupAddress}
                        onChange={handleInputChange}
                        placeholder="Enter complete pickup address including city, state, and ZIP code"
                        className="mt-1 min-h-[80px]"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Destination Location Section */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-100 pb-2">
                    Destination Location
                  </h2>
                  
                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <Label htmlFor="destName">Destination/Facility Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="destName"
                          name="destName"
                          value={formData.destName}
                          onChange={handleInputChange}
                          placeholder="e.g., Medical Center, Clinic, etc."
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="destPhone">Destination Phone Number</Label>
                        <Input
                          id="destPhone"
                          name="destPhone"
                          type="tel"
                          value={formData.destPhone}
                          onChange={handlePhoneChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="destAddress">Destination Address <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="destAddress"
                        name="destAddress"
                        value={formData.destAddress}
                        onChange={handleInputChange}
                        placeholder="Enter complete destination address including city, state, and ZIP code"
                        className="mt-1 min-h-[80px]"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-100 pb-2">
                    Additional Information
                  </h2>
                  
                  <div>
                    <Label htmlFor="additionalInfo">Special Requests or Additional Information</Label>
                    <Textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      placeholder="Please include any special needs, mobility requirements, or other important information..."
                      className="mt-1 min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Submit Section */}
                <div className="text-center pt-8 border-t">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Submit Transportation Request
                  </Button>
                  <p className="mt-4 text-sm text-gray-600">
                    We will contact you within 24 hours to confirm your ride details.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rides;