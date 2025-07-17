import React, { useState, useEffect } from 'react';
// Import Lucide React icons for a modern look. You can find more icons at https://lucide.dev/icons/
import {
  Heart, Pill, Syringe, Dna, Stethoscope, Briefcase, FlaskConical, Award,
  CheckCircle, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin,
  ChevronRight, Calendar, User, MessageSquare, Plus, Minus,
  ChevronDown, ChevronUp, Search, Clock, PhoneCall,
  Activity, Microscope, TestTube, X, Menu,
} from 'lucide-react';
import './App.css'

// Main App component
function App() {
  // State for mobile navigation menu
  const [isNavOpen, setIsNavOpen] = useState(false);
  // State for active department in the Departments section
  const [activeDepartment, setActiveDepartment] = useState('Cardiology');
  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState(null);

  // Function to toggle mobile navigation
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Dummy data for sections (replace with your actual content)
  const departments = [
    { name: 'Cardiology', content: 'Qui laudantium consequatur laborum sit qui ad sapiente dilla parade sonata raqer a videna mareta pauioli marika. Et nobis maiores eius. Incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Et reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', image: 'https://themewagon.github.io/MediCio/assets/img/departments-1.jpg' },
    { name: 'Neurology', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', image: 'https://themewagon.github.io/MediCio/assets/img/departments-2.jpg' },
    { name: 'Hepatology', content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', image: '' },
    { name: 'Pediatrics', content: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.', image: 'https://themewagon.github.io/MediCio/assets/img/departments-4.jpg' },
    { name: 'Ophthalmologists', content: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?', image: 'https://themewagon.github.io/MediCio/assets/img/departments-5.jpg' },
  ];

  const testimonials = [
    { quote: 'Export tempor illum malis eram quae irure some lorem cillum quid malis minim temporibus illum veniam.', name: 'Sara Willson', title: 'Designer', image: 'https://themewagon.github.io/MediCio/assets/img/testimonials/testimonials-2.jpg' },
    { quote: 'Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla veniam duis minim temporibus lorem minim.', name: 'Jena Karlis', title: 'Store Owner', image: 'https://themewagon.github.io/MediCio/assets/img/testimonials/testimonials-3.jpg' },
    { quote: 'Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export lorem enim duis veniam enim minim fugiat dolore lorem veniam.', name: 'Matt Brandon', title: 'Freelancer', image: 'https://themewagon.github.io/MediCio/assets/img/testimonials/testimonials-4.jpg' },
  ];

  const doctors = [
    { name: 'Walter White', title: 'Chief Medical Officer', image: 'https://themewagon.github.io/MediCio/assets/img/doctors/doctors-1.jpg' },
    { name: 'Sarah Jhonson', title: 'Anesthesiologist', image: 'https://themewagon.github.io/MediCio/assets/img/doctors/doctors-2.jpg' },
    { name: 'William Anderson', title: 'Cardiology', image: 'https://themewagon.github.io/MediCio/assets/img/doctors/doctors-3.jpg' },
    { name: 'Amanda Jepson', title: 'Neurosurgeon', image: 'https://themewagon.github.io/MediCio/assets/img/doctors/doctors-4.jpg' },
  ];

  const galleryImages = [
    'https://themewagon.github.io/MediCio/assets/img/gallery/gallery-8.jpg',
    'https://themewagon.github.io/MediCio/assets/img/gallery/gallery-7.jpg',
    'https://themewagon.github.io/MediCio/assets/img/gallery/gallery-6.jpg',
    'https://themewagon.github.io/MediCio/assets/img/gallery/gallery-5.jpg',
    'https://themewagon.github.io/MediCio/assets/img/gallery/gallery-4.jpg',
    'https://themewagon.github.io/MediCio/assets/img/gallery/gallery-3.jpg',
  ];

  const faqs = [
    { question: 'Non consectetur a erat nam at lectus urna duis?', answer: 'Feugiat scelerisque varius morbi enim nunc faucibus. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Vitae turpis massa sed elementum tempus egestas sed sed risus.' },
    { question: 'Feugiat scelerisque varius morbi enim nunc faucibus?', answer: 'Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. In massa tempor nec feugiat nisl pretium fusce id velit ut. At ipsum ac feugiat sed lectus vestibulum mattis ullamcorper velit. Odio aenean sed adipiscing diam donec adipiscing tristique. Feugiat scelerisque varius morbi enim nunc faucibus. Velit euismod in pellentesque massa placerat duis ultricies lacus sed.' },
    { question: 'Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi?', answer: 'Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis.' },
    { question: 'Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?', answer: 'Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. In massa tempor nec feugiat nisl pretium fusce id velit ut. At ipsum ac feugiat sed lectus vestibulum mattis ullamcorper velit. Odio aenean sed adipiscing diam donec adipiscing tristique. Feugiat scelerisque varius morbi enim nunc faucibus. Velit euismod in pellentesque massa placerat duis ultricies lacus sed.' },
    { question: 'Tempus quam pellentesque nec nam aliquam sem et tortor consequat?', answer: 'Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. In massa tempor nec feugiat nisl pretium fusce id velit ut. At ipsum ac feugiat sed lectus vestibulum mattis ullamcorper velit. Odio aenean sed adipiscing diam donec adipiscing tristique. Feugiat scelerisque varius morbi enim nunc faucibus. Velit euismod in pellentesque massa placerat duis ultricies lacus sed.' },
  ];

  return (
    <div className="App">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container flex justify-between items-center py-2">
          <div className="flex items-center text-sm">
            <Clock className="icon mr-2" size={16} />
            Monday - Saturday, 8AM to 10PM
          </div>
          <div className="flex items-center text-sm">
            <PhoneCall className="icon mr-2" size={16} />
            Call us now: <a href="tel:+15589554885" className="ml-1">+1 5589 55488 5</a>
          </div>
        </div>
      </div>

      
      <header className="header">
        <div className="container flex justify-between items-center py-4">
          <div className="logo">
            
            <img src="https://image.shutterstock.com/image-vector/circles-objects-color-full-design-260nw-2438641405.jpg" alt="Medicio Logo" className="h-10" />
            <h2>MEDICIO</h2>
          </div>
          <nav className={`nav ${isNavOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><a href="#home" className="nav-link active">Home</a></li>
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#services" className="nav-link">Services</a></li>
              <li><a href="#departments" className="nav-link">Departments</a></li>
              <li><a href="#doctors" className="nav-link">Doctors</a></li>
              <li className="dropdown">
                <a href="#" className="nav-link dropdown-toggle">Dropdown <ChevronDown size={16} /></a>
                <ul className="dropdown-menu">
                  <li><a href="#" className="dropdown-item">Dropdown 1</a></li>
                  <li className="dropdown-submenu">
                    <a href="#" className="dropdown-item">Deep Dropdown <ChevronRight size={16} /></a>
                    <ul className="submenu-items">
                      <li><a href="#" className="dropdown-item">Deep Dropdown 1</a></li>
                      <li><a href="#" className="dropdown-item">Deep Dropdown 2</a></li>
                    </ul>
                  </li>
                  <li><a href="#" className="dropdown-item">Dropdown 2</a></li>
                </ul>
              </li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
            <a href="#appointment" className="btn btn-primary ml-4">Make an Appointment</a>
          </nav>
          <button className="menu-toggle" onClick={toggleNav}>
            {isNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="container">
            <h1>Welcome to Medicio</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <a href="#appointment" className="btn btn-primary">Read More</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section-padding">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="feature-card">
            <Heart className="feature-icon" size={48} />
            <h3>Lorem Ipsum</h3>
            <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
          </div>
          <div className="feature-card">
            <Pill className="feature-icon" size={48} />
            <h3>Sed ut perspici</h3>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
          </div>
          <div className="feature-card">
            <Syringe className="feature-icon" size={48} />
            <h3>Magni Dolores</h3>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
          </div>
          <div className="feature-card">
            <Dna className="feature-icon" size={48} />
            <h3>Nemo Enim</h3>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
          </div>
        </div>
      </section>

      {/* Emergency Call to Action */}
      <section className="emergency-cta section-padding">
        <div className="container text-center">
          <h2>In an emergency? Need help now?</h2>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <a href="#appointment" className="btn btn-primary">Make an Appointment</a>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section section-padding">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="about-image">
            {/* Replace with your about image */}
            <img src="https://themewagon.github.io/MediCio/assets/img/about.jpg" alt="About Us" className="rounded-lg shadow-lg" />
          </div>
          <div className="about-content">
            <h2>Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <ul className="about-list">
              <li><CheckCircle className="icon-check" size={20} /> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
              <li><CheckCircle className="icon-check" size={20} /> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
              <li><CheckCircle className="icon-check" size={20} /> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
              <li><CheckCircle className="icon-check" size={20} /> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident</li>
            </ul>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
          <div className="stat-item">
            <User className="stat-icon" size={48} />
            <span className="stat-number">25</span>
            <p className="stat-label">Doctors</p>
          </div>
          <div className="stat-item">
            <Briefcase className="stat-icon" size={48} />
            <span className="stat-number">15</span>
            <p className="stat-label">Departments</p>
          </div>
          <div className="stat-item">
            <FlaskConical className="stat-icon" size={48} />
            <span className="stat-number">8</span>
            <p className="stat-label">Research Labs</p>
          </div>
          <div className="stat-item">
            <Award className="stat-icon" size={48} />
            <span className="stat-number">150</span>
            <p className="stat-label">Awards</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us section-padding">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="why-choose-us-image">
            {/* Replace with your why choose us image */}
            <img src="https://themewagon.github.io/MediCio/assets/img/features.jpg" alt="Why Choose Us" className="rounded-lg shadow-lg" />
          </div>
          <div className="why-choose-us-content">
            <h2>Enim quis est voluptatibus aliquid consequatur fugiat</h2>
            <p>Esse voluptatem cumque vel exercitationem. Reiciendis est hic accusamus. Non ipsam et sed minima temporibus laudantium. Soluta voluptate sed facere corporis dolores excepturi</p>
            <div className="feature-item">
              <Heart className="feature-item-icon" size={32} />
              <div>
                <h3>Lorem Ipsum</h3>
                <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
              </div>
            </div>
            <div className="feature-item">
              <Dna className="feature-item-icon" size={32} />
              <div>
                <h3>Nemo Enim</h3>
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
              </div>
            </div>
            <div className="feature-item">
              <Stethoscope className="feature-item-icon" size={32} />
              <div>
                <h3>Dine Pad</h3>
                <p>Explicabo est voluptatum asperiores consequatur magnam. Et veritatis odit. Sunt aut deserunt minus aut eligendi omnis</p>
              </div>
            </div>
            <div className="feature-item">
              <Activity className="feature-item-icon" size={32} />
              <div>
                <h3>Tride clov</h3>
                <p>Est voluptatem labore deleniti quis a delectus et. Saepe dolorem libero ait non espernatur odit amet. Et eligendi.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section section-padding">
        <div className="container">
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="service-card">
              <Heart className="service-icon" size={48} />
              <h3>Nescunt Mete</h3>
              <p>Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis et consequatur.</p>
            </div>
            <div className="service-card">
              <Pill className="service-icon" size={48} />
              <h3>Eosle Commodi</h3>
              <p>Ut autem aut non a. Sint sit sit facilim nam iusto sint. Libero corrupti neque eum hic non quam dolor.</p>
            </div>
            <div className="service-card">
              <Syringe className="service-icon" size={48} />
              <h3>Ledo Markt</h3>
              <p>Ut excepturi voluptatem nisi sed. Qui fuga eum. Minima eius rem non et debitis iure. Excepturi eum.</p>
            </div>
            <div className="service-card">
              <Dna className="service-icon" size={48} />
              <h3>Asperiores Commodit</h3>
              <p>Non et temporibus minus omnis sed dolor esse consequatur. Cupiditate sed error ea fuga sit provident adipisci neque.</p>
            </div>
            <div className="service-card">
              <Microscope className="service-icon" size={48} />
              <h3>Velit Doloremque</h3>
              <p>Cumque et suscipit saepe. Est molestiae autem enim facilis ut est ipsum corporis. Sunt aut deserunt minus aut eligendi omnis</p>
            </div>
            <div className="service-card">
              <TestTube className="service-icon" size={48} />
              <h3>Dolori Architecto</h3>
              <p>Hic molestias ea voluptatum enim rerum et non et debitis iure. Excepturi eum. Minima eius rem non et debitis iure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Make an Appointment Section */}
      <section id="appointment" className="appointment-section section-padding bg-light">
        <div className="container">
          <h2 className="section-title">Make an Appointment</h2>
          <p className="section-subtitle">Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
          <form className="appointment-form grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <input type="text" placeholder="Your Name" className="form-input" />
            <input type="email" placeholder="Your Email" className="form-input" />
            <input type="text" placeholder="Your Phone" className="form-input" />
            <input type="date" placeholder="mm/dd/yyyy --:--" className="form-input" />
            <select className="form-input">
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.name} value={dept.name}>{dept.name}</option>
              ))}
            </select>
            <select className="form-input">
              <option value="">Select Doctor</option>
              {doctors.map(doc => (
                <option key={doc.name} value={doc.name}>{doc.name}</option>
              ))}
            </select>
            <textarea placeholder="Message (Optional)" className="form-input md:col-span-2" rows="5"></textarea>
            <div className="md:col-span-2 text-center">
              <button type="submit" className="btn btn-primary">Make an Appointment</button>
            </div>
          </form>
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="departments-section section-padding">
        <div className="container">
          <h2 className="section-title">Departments</h2>
          <p className="section-subtitle">Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="department-nav">
              <ul>
                {departments.map((dept) => (
                  <li key={dept.name}>
                    <a
                      href="#"
                      className={`department-nav-link ${activeDepartment === dept.name ? 'active' : ''}`}
                      onClick={(e) => { e.preventDefault(); setActiveDepartment(dept.name); }}
                    >
                      {dept.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="department-content lg:col-span-2">
              {departments.map((dept) => (
                activeDepartment === dept.name && (
                  <div key={dept.name} className="department-detail flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                      <h3>{dept.name}</h3>
                      <p>{dept.content}</p>
                    </div>
                    <div className="md:w-1/3 flex-shrink-0">
                      <img src={dept.image} alt={dept.name} className="rounded-lg shadow-lg w-full h-auto object-cover" />
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section section-padding bg-light">
        <div className="container">
          <h2 className="section-title">Testimonials</h2>
          <p className="section-subtitle">Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
          <div className="testimonials-carousel mt-8">
            {/* Simple static display for testimonials. For a true carousel, you'd integrate a library like react-slick */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <p className="testimonial-quote">
                    <span className="quote-icon-left">“</span>
                    {testimonial.quote}
                    <span className="quote-icon-right">”</span>
                  </p>
                  <div className="testimonial-author flex items-center mt-4">
                    <img src={testimonial.image} alt={testimonial.name} className="author-img" />
                    <div className="author-info ml-3">
                      <h4>{testimonial.name}</h4>
                      <span>{testimonial.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel-dots flex justify-center mt-6">
              {/* Add more dots if you have more testimonials and a carousel library */}
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="doctors-section section-padding">
        <div className="container">
          <h2 className="section-title">Doctors</h2>
          <p className="section-subtitle">Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {doctors.map((doctor, index) => (
              <div key={index} className="doctor-card">
                <img src={doctor.image} alt={doctor.name} className="doctor-img" />
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <span>{doctor.title}</span>
                  <div className="social-links">
                    {/* Replace with actual social media links */}
                    <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
                    <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
                    <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
                    <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section section-padding bg-light">
        <div className="container">
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
          <div className="gallery-carousel mt-8">
            {/* Simple static display for gallery. For a true carousel, you'd integrate a library like react-slick */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((img, index) => (
                <div key={index} className="gallery-item">
                  <img src={img} alt={`Gallery Image ${index + 1}`} className="rounded-lg shadow-md w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="carousel-dots flex justify-center mt-6">
              {/* Add more dots if you have more images and a carousel library */}
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section section-padding">
        <div className="container">
          <h2 className="section-title">Pricing</h2>
          <p className="section-subtitle">Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="pricing-card">
              <h3>Free</h3>
              <div className="price"><sup>$</sup>0<span> / month</span></div>
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisi</li>
                <li>Nulla at volutpat dola</li>
                <li className="na">Pharetra massa</li>
                <li className="na">Massa ultricies mi</li>
              </ul>
              <button className="btn btn-secondary">Buy Now</button>
            </div>
            <div className="pricing-card featured">
              <h3>Business</h3>
              <div className="price"><sup>$</sup>19<span> / month</span></div>
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisi</li>
                <li>Nulla at volutpat dola</li>
                <li>Pharetra massa</li>
                <li className="na">Massa ultricies mi</li>
              </ul>
              <button className="btn btn-primary">Buy Now</button>
            </div>
            <div className="pricing-card">
              <h3>Developer</h3>
              <div className="price"><sup>$</sup>29<span> / month</span></div>
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisi</li>
                <li>Nulla at volutpat dola</li>
                <li>Pharetra massa</li>
                <li>Massa ultricies mi</li>
              </ul>
              <button className="btn btn-secondary">Buy Now</button>
            </div>
            <div className="pricing-card advanced">
              <h3>Ultimate</h3>
              <div className="price"><sup>$</sup>49<span> / month</span></div>
              <ul>
                <li>Aida dere</li>
                <li>Nec feugiat nisi</li>
                <li>Nulla at volutpat dola</li>
                <li>Pharetra massa</li>
                <li>Massa ultricies mi</li>
              </ul>
              <button className="btn btn-secondary">Buy Now</button>
              <div className="ribbon"><span>Advanced</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="faq-section section-padding bg-light">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
          <div className="faq-list mt-8">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {faq.question}
                  {openFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section section-padding">
        <div className="container">
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>

          <div className="map-container mt-8">
            {/* Replace with your actual Google Maps embed iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.142345678901!2d-73.9876543236047!3d40.7588969713788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map of Times Square"
            ></iframe>
          </div>

          <div className="contact-info-form grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div className="contact-details grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="info-box">
                <MapPin className="info-icon" size={32} />
                <h3>Address</h3>
                <p>A108 Adam Street, New York, NY 535022</p>
              </div>
              <div className="info-box">
                <Phone className="info-icon" size={32} />
                <h3>Call Us</h3>
                <p><a href="tel:+15589554885">+1 5589 55488 5</a></p>
              </div>
              <div className="info-box md:col-span-2">
                <Mail className="info-icon" size={32} />
                <h3>Email Us</h3>
                <p><a href="mailto:info@example.com">info@example.com</a></p>
              </div>
            </div>
            <form className="contact-form grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="form-input" />
              <input type="email" placeholder="Your Email" className="form-input" />
              <input type="text" placeholder="Subject" className="form-input md:col-span-2" />
              <textarea placeholder="Message" className="form-input md:col-span-2" rows="7"></textarea>
              <div className="md:col-span-2 text-center">
                <button type="submit" className="btn btn-primary">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="footer-about">
            <h3>Medicio</h3>
            <p>A108 Adam Street, New York, NY 535022</p>
            <p><strong>Phone:</strong> <a href="tel:+15589554885">+1 5589 55488 5</a></p>
            <p><strong>Email:</strong> <a href="mailto:info@example.com">info@example.com</a></p>
            <div className="social-links mt-4">
              {/* Replace with actual social media links */}
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><ChevronRight size={16} className="link-icon" /><a href="#">Home</a></li>
              <li><ChevronRight size={16} className="link-icon" /><a href="#">About us</a></li>
              <li><ChevronRight size={16} className="link-icon" /><a href="#">Services</a></li>
              <li><ChevronRight size={16} className="link-icon" /><a href="#">Terms of service</a></li>
              <li><ChevronRight size={16} className="link-icon" /><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><ChevronRight size={16} className="link-icon" /><a href="#">Web Design</a></li>
              <li><ChevronRight size={16} className="link-icon" /><a href="#">Web Development</a></li>
              <li><ChevronRight size={16} className="link-icon" /><a href="#">Product Management</a></li>
              <li><ChevronRight size={16} className="link-icon" /><a href="#">Marketing</a></li>
              <li><ChevronRight size={16} className="link-icon" /><a href="#">Graphic Design</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Hic solutasetp</h4>
            <ul>
              <li><ChevronRight size={16} className="link-icon" /><a href="#">Molestiae accusamus iure</a></li>
              <li><ChevronRight size={16} className="link-icon" /><a href="#">Excepturi dignissimos</a></li>
              <li><ChevronRight size={16} className="link-icon" /><a href="#">Dilecta</a></li>
              <li><ChevronRight size={16} className="link-icon" /><a href="#">Tradelas</a></li>
              <li><ChevronRight size={16} className="link-icon" /><a href="#">Filaso</a></li>
            </ul>
          </div>
        </div>

        <div className="container copyright text-center mt-8 pt-4 border-t border-gray-700">
          <p>&copy; Copyright <strong>Medicio</strong>. All Rights Reserved</p>
          <p>Designed by <a href="https://bootstrapmade.com/" target="_blank" rel="noopener noreferrer">BootstrapMade</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
