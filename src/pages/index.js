import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Athmachaithanya provided immense support during my father's treatment at Kottayam Medical College. Their prayers and financial assistance gave us hope in difficult times.",
      author: "Rajesh Kumar",
      role: "Patient's Family Member"
    },
    {
      text: "The work done by Athmachaithanya is remarkable. They bring peace and comfort to hundreds of patients and families in the hospital every day.",
      author: "Dr. Priya Nair",
      role: "Senior Doctor, Kottayam MCH"
    },
    {
      text: "As a volunteer with Athmachaithanya, I've witnessed firsthand how this organization transforms lives through compassion and service.",
      author: "Sneha Menon",
      role: "Volunteer"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div>
      <Head>
        <title>Athmachaithanya - Prayer Center & Charity Trust</title>
        <meta name="description" content="Athmachaithanya prayer center and charity trust at Kottayam Medical College Hospital" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Athmachaithanya</h1>
          <p>A prayer center and charity trust dedicated to serving the community at Kottayam Medical College Hospital</p>
          <div className="hero-buttons">
            <Link href="/about" className="btn">Learn More</Link>
            <Link href="/donate" className="btn btn-outline">Donate Now</Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>About Us</h2>
          </div>
          <div className="about-content">
            <div className="about-image">
              <Image 
                src="/images/prayer-center.jpg" 
                alt="Athmachaithanya Prayer Center" 
                width={600} 
                height={400} 
              />
            </div>
            <div className="about-text">
              <h3>Our Mission</h3>
              <p>Athmachaithanya is a prayer center and charity trust established to provide spiritual support and humanitarian services to patients, attendants, and staff at Kottayam Medical College Hospital.</p>
              <p>Founded with the vision of creating a healing environment that addresses both physical and spiritual needs, our organization works tirelessly to bring comfort and hope to those facing medical challenges.</p>
              <p>Through our various initiatives, we aim to extend support to the underprivileged sections of society, ensuring that financial constraints don't prevent anyone from receiving proper medical care.</p>
              <Link href="/about" className="btn">Read More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features">
        <div className="container">
          <div className="section-title">
            <h2>Our Services</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-pray"></i>
              </div>
              <h3>Prayer Services</h3>
              <p>Daily prayer sessions and spiritual guidance for patients and their families.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-hand-holding-heart"></i>
              </div>
              <h3>Financial Assistance</h3>
              <p>Support for medical expenses and treatments for economically disadvantaged patients.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Counseling</h3>
              <p>Emotional and psychological support for patients and their families during difficult times.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Testimonials</h2>
          </div>
          <div className="testimonials-slider">
            <div className="testimonial active">
              <p className="testimonial-text">{testimonials[currentTestimonial].text}</p>
              <div className="testimonial-author">{testimonials[currentTestimonial].author}</div>
              <div className="testimonial-role">{testimonials[currentTestimonial].role}</div>
            </div>
            <div className="testimonial-controls">
              <button onClick={() => setCurrentTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length)}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button onClick={() => setCurrentTestimonial((currentTestimonial + 1) % testimonials.length)}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
