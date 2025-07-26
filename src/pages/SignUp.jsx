import { useState } from "react";


const SignupPage = () => {
  const [errors, setErrors] = useState({});

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    full_name: "",
    phone_number: "",
    gender: "",
    age: "",
    address: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    const validationErrors = validateStep1();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setStep(2);
    }
  };
  
  const handleSignup = (e) => {
    e.preventDefault();
    const validationErrors = validateStep2();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Signing up with:", formData);
      // Proceed with API call
    }
  };
  

  const validateStep1 = () => {
    const errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Invalid email format";
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)) {
      errs.password = "Min 8 chars, 1 letter & 1 number";
    }
    return errs;
  };
  
  const validateStep2 = () => {
    const errs = {};
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
      errs.username = "3–20 chars, no spaces, only _ allowed";
    }
    if (!/^\+?\d{10,13}$/.test(formData.phone_number)) {
      errs.phone_number = "Invalid phone number";
    }
    if (!(formData.age >= 10 && formData.age <= 100)) {
      errs.age = "Age must be between 10 and 100";
    }
    if (!formData.gender) errs.gender = "Gender is required";
    if (!formData.full_name.trim()) errs.full_name = "Full name is required";
    if (!formData.address.trim()) errs.address = "Address is required";
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.state.trim()) errs.state = "State is required";
    return errs;
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {step === 1 ? "Create Account" : "Tell Us More"}
        </h2>

        <form onSubmit={step === 1 ? handleNext : handleSignup} className="space-y-5">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-emerald-400 focus:outline-none"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-emerald-400 focus:outline-none"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
              </div>
            </>
          )}

          {step === 2 && (
            <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-emerald-400 focus:outline-none"
                        placeholder="John Doe"
                    />
                    {errors.username && <p className="text-sm text-red-500 mt-1">{errors.full_name}</p>}

                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-emerald-400 focus:outline-none"
                        placeholder="johnd123"
                    />
                    {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-emerald-400 focus:outline-none"
                        placeholder="+91 98765 43210"
                    />
                    {errors.username && <p className="text-sm text-red-500 mt-1">{errors.phone_number}</p>}
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl bg-white focus:ring-emerald-400 focus:outline-none"
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    </div>
                    {errors.username && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-emerald-400 focus:outline-none"
                        placeholder="22"
                    />
                    {errors.username && <p className="text-sm text-red-500 mt-1">{errors.age}</p>}
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-emerald-400 focus:outline-none"
                        placeholder="123 Park Ave"
                    />
                    {errors.username && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-emerald-400 focus:outline-none"
                        placeholder="Mumbai"
                    />
                    {errors.username && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-emerald-400 focus:outline-none"
                        placeholder="Maharashtra"
                    />
                    {errors.username && <p className="text-sm text-red-500 mt-1">{errors.state}</p>}
                    </div>
                </div>
                </>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 rounded-xl font-semibold hover:bg-emerald-600 transition"
          >
            {step === 1 ? "Next" : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-emerald-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
