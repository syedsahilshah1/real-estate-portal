import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

const API_BASE_URL = 'http://localhost:8000/api';

// Config axios defaults
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

// Preseed Local Data (Fallback / Development)
const INITIAL_PROJECTS = [
  {
    id: 1,
    name: 'Faisal Town (Phase I)',
    slug: 'faisal-town-phase-1',
    description: 'Faisal Town Phase I is an elite residential society located near the Fateh Jang Interchange of the M-1 Motorway. Offering premium facilities, wide paved roads, underground electricity, state-of-the-art security, and luxurious commercial centers. It stands as a flagship community showcasing modern town planning and architectural excellence.',
    location: 'Fateh Jang Interchange, M-1 Motorway, Islamabad',
    total_area: '12,000 Kanal',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'Completed',
    brochure: '/brochures/faisal_town_p1.pdf'
  },
  {
    id: 2,
    name: 'Faisal Town (Phase II)',
    slug: 'faisal-town-phase-2',
    description: 'Faisal Town Phase II is a spectacular expansion situated right next to the Thalian Interchange of the M-2 Motorway. Designed to cater to the rapid growth of the twin cities, Phase II offers massive residential sectors, premium standard amenities, green belts, and a high-velocity development pace that promises unmatched return on investment.',
    location: 'Thalian Interchange, M-2 Motorway, Rawalpindi/Islamabad',
    total_area: '25,000 Kanal',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'Active Development',
    brochure: '/brochures/faisal_town_p2.pdf'
  },
  {
    id: 3,
    name: 'Faisal Hills',
    slug: 'faisal-hills',
    description: 'Faisal Hills is situated in the ancient city of Taxila, surrounded by the beautiful Margalla Hills. Offering peace, scenic views, and natural landscapes, Faisal Hills features sectors named A, B, C, and D, each equipped with lush parks, international standard educational facilities, family clubs, and shopping plazas.',
    location: 'Main G.T. Road, Taxila, Islamabad GT Road',
    total_area: '18,000 Kanal',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'Active Development',
    brochure: '/brochures/faisal_hills.pdf'
  },
  {
    id: 4,
    name: 'Faisal Jewel',
    slug: 'faisal-jewel',
    description: 'Faisal Jewel is a landmark high-rise mixed-use luxury tower in the heart of Islamabad F-10 Markaz. It combines ultra-modern residential penthouses, retail outlets showcasing international designer brands, and corporate office spaces, complete with standard swimming pools, fitness centers, and rooftop dining.',
    location: 'F-10 Markaz, Islamabad',
    total_area: '5 Kanal Plot, 32 Storey Tower',
    type: 'High-Rise',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'Upcoming',
    brochure: '/brochures/faisal_jewel.pdf'
  }
];

const INITIAL_PLOTS = [
  // Faisal Town Phase I plots
  { id: 101, project_id: 1, size: '5 Marla', type: 'Residential', price: 3500000, installment_months: 36, down_payment: 700000, monthly_installment: 65000, status: 'available' },
  { id: 102, project_id: 1, size: '10 Marla', type: 'Residential', price: 6500000, installment_months: 36, down_payment: 1300000, monthly_installment: 120000, status: 'available' },
  { id: 103, project_id: 1, size: '1 Kanal', type: 'Residential', price: 12000000, installment_months: 36, down_payment: 2500000, monthly_installment: 220000, status: 'booked' },
  { id: 104, project_id: 1, size: '4 Marla', type: 'Commercial', price: 9500000, installment_months: 36, down_payment: 2000000, monthly_installment: 180000, status: 'available' },

  // Faisal Town Phase II plots
  { id: 201, project_id: 2, size: '5.5 Marla', type: 'Residential', price: 2900000, installment_months: 48, down_payment: 580000, monthly_installment: 40000, status: 'available' },
  { id: 202, project_id: 2, size: '8 Marla', type: 'Residential', price: 3800000, installment_months: 48, down_payment: 760000, monthly_installment: 52000, status: 'available' },
  { id: 203, project_id: 2, size: '10.8 Marla', type: 'Residential', price: 5200000, installment_months: 48, down_payment: 1040000, monthly_installment: 72000, status: 'available' },
  { id: 204, project_id: 2, size: '1 Kanal', type: 'Residential', price: 9800000, installment_months: 48, down_payment: 1960000, monthly_installment: 135000, status: 'available' },
  { id: 205, project_id: 2, size: '5 Marla', type: 'Commercial', price: 11000000, installment_months: 48, down_payment: 2200000, monthly_installment: 150000, status: 'available' },

  // Faisal Hills plots
  { id: 301, project_id: 3, size: '5 Marla', type: 'Residential', price: 2600000, installment_months: 36, down_payment: 520000, monthly_installment: 48000, status: 'available' },
  { id: 302, project_id: 3, size: '10 Marla', type: 'Residential', price: 4800000, installment_months: 36, down_payment: 960000, monthly_installment: 90000, status: 'available' },
  { id: 303, project_id: 3, size: '1 Kanal', type: 'Residential', price: 8900000, installment_months: 36, down_payment: 1800000, monthly_installment: 165000, status: 'available' },

  // Faisal Jewel units
  { id: 401, project_id: 4, size: '2-Bed Apartment', type: 'Commercial', price: 14500000, installment_months: 48, down_payment: 2900000, monthly_installment: 200000, status: 'available' },
  { id: 402, project_id: 4, size: '3-Bed Apartment', type: 'Commercial', price: 19500000, installment_months: 48, down_payment: 3900000, monthly_installment: 275000, status: 'available' },
  { id: 403, project_id: 4, size: 'Executive Office', type: 'Commercial', price: 28000000, installment_months: 48, down_payment: 5600000, monthly_installment: 390000, status: 'available' }
];

export const AppProvider = ({ children }) => {
  // Try to load state from localStorage or seed
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ft_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('ft_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [plots, setPlots] = useState(() => {
    const saved = localStorage.getItem('ft_plots');
    return saved ? JSON.parse(saved) : INITIAL_PLOTS;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('ft_bookings');
    return saved ? JSON.parse(saved) : [
      {
        id: 10001,
        user_id: 2, // Assuming standard user has id 2
        plot_id: 103,
        booking_date: '2026-08-01',
        status: 'approved',
        payment_status: 'partial',
        installment_plan: { paid_installments: 2, total_installments: 36, amount_paid: 2740000 }
      }
    ];
  });

  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('ft_inquiries');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Zeeshan Khan', email: 'zeeshan@example.com', phone: '+92 300 1234567', message: 'I am interested in buying 5 Marla plots in Faisal Town Phase 2. Please share downpayment details.', project_id: 2, status: 'new', created_at: '2026-08-10' },
      { id: 2, name: 'Sajid Mehmood', email: 'sajid@example.com', phone: '+92 333 9876543', message: 'What is the commercial plot launching date in Faisal Hills?', project_id: 3, status: 'replied', created_at: '2026-08-09' }
    ];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('ft_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [useBackend, setUseBackend] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('ft_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('ft_plots', JSON.stringify(plots));
  }, [plots]);

  useEffect(() => {
    localStorage.setItem('ft_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('ft_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('ft_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Check if Backend API is running on startup
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/check`);
        if (response.status === 200) {
          setUseBackend(true);
          console.log('Successfully connected to Laravel Backend!');
          // Synchronize data from backend
          fetchBackendData();
        }
      } catch (err) {
        console.log('Laravel Backend offline. Seamlessly running in Mock / Client-only Mode.');
        setUseBackend(false);
      }
    };
    checkBackend();
  }, []);

  const fetchBackendData = async () => {
    try {
      const projRes = await axios.get(`${API_BASE_URL}/projects`);
      setProjects(projRes.data);
      const plotRes = await axios.get(`${API_BASE_URL}/plots`);
      setPlots(plotRes.data);
      if (currentUser) {
        const bookRes = await axios.get(`${API_BASE_URL}/bookings`);
        setBookings(bookRes.data);
        if (currentUser.role === 'admin') {
          const inqRes = await axios.get(`${API_BASE_URL}/inquiries`);
          setInquiries(inqRes.data);
        }
      }
    } catch (err) {
      console.error('Error fetching backend data:', err);
    }
  };

  // Auth Operations
  const login = async (email, password) => {
    if (useBackend) {
      try {
        await axios.get('/sanctum/csrf-cookie');
        const res = await axios.post(`${API_BASE_URL}/login`, { email, password });
        setCurrentUser(res.data.user);
        localStorage.setItem('ft_user', JSON.stringify(res.data.user));
        // Add auth token header
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        localStorage.setItem('ft_token', res.data.token);
        fetchBackendData();
        return { success: true, user: res.data.user };
      } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Login failed' };
      }
    } else {
      // Mock Login
      if (email === 'admin@faisaltown.com' && password === 'admin123') {
        const user = { id: 1, name: 'Admin Officer', email: 'admin@faisaltown.com', role: 'admin' };
        setCurrentUser(user);
        localStorage.setItem('ft_user', JSON.stringify(user));
        return { success: true, user };
      } else if (email === 'user@example.com' && password === 'user123') {
        const user = { id: 2, name: 'Syed Hamza', email: 'user@example.com', role: 'user' };
        setCurrentUser(user);
        localStorage.setItem('ft_user', JSON.stringify(user));
        return { success: true, user };
      } else {
        // Dynamic search in localStorage
        const storedUsers = JSON.parse(localStorage.getItem('ft_registered_users') || '[]');
        const found = storedUsers.find(u => u.email === email && u.password === password);
        if (found) {
          const user = { id: found.id, name: found.name, email: found.email, role: 'user' };
          setCurrentUser(user);
          localStorage.setItem('ft_user', JSON.stringify(user));
          return { success: true, user };
        }
      }
      return { success: false, message: 'Invalid credentials. Hint: use admin@faisaltown.com / admin123 or user@example.com / user123' };
    }
  };

  const register = async (name, email, password) => {
    if (useBackend) {
      try {
        const res = await axios.post(`${API_BASE_URL}/register`, { name, email, password });
        setCurrentUser(res.data.user);
        localStorage.setItem('ft_user', JSON.stringify(res.data.user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        localStorage.setItem('ft_token', res.data.token);
        return { success: true, user: res.data.user };
      } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Registration failed' };
      }
    } else {
      // Mock Register
      const storedUsers = JSON.parse(localStorage.getItem('ft_registered_users') || '[]');
      if (storedUsers.some(u => u.email === email) || email === 'admin@faisaltown.com' || email === 'user@example.com') {
        return { success: false, message: 'Email already exists' };
      }
      const newUser = { id: Date.now(), name, email, password, role: 'user' };
      storedUsers.push(newUser);
      localStorage.setItem('ft_registered_users', JSON.stringify(storedUsers));
      
      const loggedUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: 'user' };
      setCurrentUser(loggedUser);
      localStorage.setItem('ft_user', JSON.stringify(loggedUser));
      return { success: true, user: loggedUser };
    }
  };

  const logout = async () => {
    if (useBackend) {
      try {
        await axios.post(`${API_BASE_URL}/logout`);
      } catch (e) {
        console.error('Logout error on backend', e);
      }
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('ft_token');
    }
    setCurrentUser(null);
    localStorage.removeItem('ft_user');
  };

  // Inquiry Operation
  const submitInquiry = async (inquiryData) => {
    if (useBackend) {
      try {
        const res = await axios.post(`${API_BASE_URL}/inquiries`, inquiryData);
        return { success: true, data: res.data };
      } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Inquiry submission failed' };
      }
    } else {
      const newInq = {
        id: Date.now(),
        ...inquiryData,
        status: 'new',
        created_at: new Date().toISOString().split('T')[0]
      };
      setInquiries(prev => [newInq, ...prev]);
      return { success: true, data: newInq };
    }
  };

  // Booking Operation
  const bookPlot = async (plotId) => {
    if (!currentUser) return { success: false, message: 'Please login to book a plot' };
    
    if (useBackend) {
      try {
        const res = await axios.post(`${API_BASE_URL}/bookings`, { plot_id: plotId });
        fetchBackendData();
        return { success: true, data: res.data };
      } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Booking failed' };
      }
    } else {
      // Find the plot
      const plot = plots.find(p => p.id === plotId);
      if (!plot) return { success: false, message: 'Plot not found' };
      if (plot.status !== 'available') return { success: false, message: 'Plot is not available' };

      // Update plot status
      const updatedPlots = plots.map(p => p.id === plotId ? { ...p, status: 'pending' } : p);
      setPlots(updatedPlots);

      // Create booking record
      const newBooking = {
        id: Math.floor(10000 + Math.random() * 90000),
        user_id: currentUser.id,
        plot_id: plotId,
        booking_date: new Date().toISOString().split('T')[0],
        status: 'pending',
        payment_status: 'unpaid',
        installment_plan: {
          paid_installments: 0,
          total_installments: plot.installment_months || 36,
          amount_paid: 0
        }
      };

      setBookings(prev => [newBooking, ...prev]);
      return { success: true, booking: newBooking };
    }
  };

  // Toggle plot wishlist
  const toggleWishlist = (plotId) => {
    setWishlist(prev => {
      if (prev.includes(plotId)) {
        return prev.filter(id => id !== plotId);
      } else {
        return [...prev, plotId];
      }
    });
  };

  // Admin Project CRUD
  const addProject = async (projectData) => {
    if (useBackend) {
      try {
        const res = await axios.post(`${API_BASE_URL}/projects`, projectData);
        fetchBackendData();
        return { success: true, data: res.data };
      } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Failed to add project' };
      }
    } else {
      const newProj = {
        id: Date.now(),
        slug: projectData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        gallery: [projectData.image || 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80'],
        brochure: '/brochures/generic.pdf',
        ...projectData
      };
      setProjects(prev => [...prev, newProj]);
      return { success: true, data: newProj };
    }
  };

  const updateProject = async (id, projectData) => {
    if (useBackend) {
      try {
        const res = await axios.put(`${API_BASE_URL}/projects/${id}`, projectData);
        fetchBackendData();
        return { success: true, data: res.data };
      } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Failed to update project' };
      }
    } else {
      const updated = projects.map(p => p.id === id ? { ...p, ...projectData } : p);
      setProjects(updated);
      return { success: true };
    }
  };

  const deleteProject = async (id) => {
    if (useBackend) {
      try {
        await axios.delete(`${API_BASE_URL}/projects/${id}`);
        fetchBackendData();
        return { success: true };
      } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Failed to delete project' };
      }
    } else {
      setProjects(prev => prev.filter(p => p.id !== id));
      setPlots(prev => prev.filter(pl => pl.project_id !== id));
      return { success: true };
    }
  };

  // Admin Plot CRUD
  const addPlot = async (plotData) => {
    if (useBackend) {
      try {
        const res = await axios.post(`${API_BASE_URL}/plots`, plotData);
        fetchBackendData();
        return { success: true, data: res.data };
      } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Failed to add plot' };
      }
    } else {
      const newPlot = {
        id: Date.now(),
        status: 'available',
        price: parseFloat(plotData.price),
        installment_months: parseInt(plotData.installment_months || 36),
        down_payment: parseFloat(plotData.down_payment),
        monthly_installment: parseFloat(plotData.monthly_installment),
        ...plotData,
        project_id: parseInt(plotData.project_id)
      };
      setPlots(prev => [...prev, newPlot]);
      return { success: true, data: newPlot };
    }
  };

  const deletePlot = async (id) => {
    if (useBackend) {
      try {
        await axios.delete(`${API_BASE_URL}/plots/${id}`);
        fetchBackendData();
        return { success: true };
      } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Failed to delete plot' };
      }
    } else {
      setPlots(prev => prev.filter(p => p.id !== id));
      return { success: true };
    }
  };

  // Admin Booking Approval
  const updateBookingStatus = async (bookingId, status, paymentStatus) => {
    if (useBackend) {
      try {
        const res = await axios.put(`${API_BASE_URL}/bookings/${bookingId}`, { status, payment_status: paymentStatus });
        fetchBackendData();
        return { success: true, data: res.data };
      } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Failed to update booking' };
      }
    } else {
      const b = bookings.find(b => b.id === bookingId);
      if (!b) return { success: false, message: 'Booking not found' };

      // If approved, set plot status to booked, otherwise if cancelled, available
      const updatedPlots = plots.map(p => {
        if (p.id === b.plot_id) {
          return { ...p, status: status === 'approved' ? 'booked' : (status === 'cancelled' ? 'available' : 'pending') };
        }
        return p;
      });
      setPlots(updatedPlots);

      // Update booking status
      const updatedBookings = bookings.map(bk => {
        if (bk.id === bookingId) {
          const amt = status === 'approved' ? (bk.installment_plan.amount_paid === 0 ? bk.installment_plan.amount_paid + (plots.find(p => p.id === bk.plot_id)?.down_payment || 0) : bk.installment_plan.amount_paid) : 0;
          return {
            ...bk,
            status,
            payment_status: paymentStatus || bk.payment_status,
            installment_plan: {
              ...bk.installment_plan,
              amount_paid: amt,
              paid_installments: status === 'approved' && bk.installment_plan.paid_installments === 0 ? 1 : bk.installment_plan.paid_installments
            }
          };
        }
        return bk;
      });
      setBookings(updatedBookings);
      return { success: true };
    }
  };

  // Admin Inquiry Manage
  const markInquiryStatus = async (id, status) => {
    if (useBackend) {
      try {
        await axios.put(`${API_BASE_URL}/inquiries/${id}`, { status });
        fetchBackendData();
        return { success: true };
      } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Failed to update inquiry' };
      }
    } else {
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
      return { success: true };
    }
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      projects,
      plots,
      bookings,
      inquiries,
      wishlist,
      useBackend,
      login,
      register,
      logout,
      submitInquiry,
      bookPlot,
      toggleWishlist,
      addProject,
      updateProject,
      deleteProject,
      addPlot,
      deletePlot,
      updateBookingStatus,
      markInquiryStatus,
      setUseBackend
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
