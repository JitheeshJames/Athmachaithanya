import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function Departments() {
  const [activeTab, setActiveTab] = useState('committee');
  
  const committeeMembers = [
    {
      name: "Rev. Fr. John Mathew",
      role: "President",
      image: "/images/fr-john.jpg",
      description: "Spiritual guide and founder of Athmachaithanya"
    },
    {
      name: "Dr. Smitha Raj",
      role: "Secretary",
      image: "/images/dr-smitha.jpg",
      description: "Senior Doctor at Kottayam MCH"
    },
    {
      name: "Mr. Ravi Kumar",
      role: "Treasurer",
      image: "/images/ravi-kumar.jpg",
      description: "Businessman and social worker"
    },
    {
      name: "Mrs. Latha Menon",
      role: "Coordinator",
      image: "/images/latha-menon.jpg",
      description: "Retired nurse and volunteer"
    }
  ];

  const activities = [
    {
      title: "Daily Prayer Meetings",
      description: "Morning and evening prayers for patients and staff",
      date: "Daily",
      image: "/images/prayer-meeting.jpg"
    },
    {
      title: "Financial Aid Distribution",
      description: "Monthly financial assistance to needy patients",
      date: "First Monday of every month",
      image: "/images/financial-aid.jpg"
    },
    {
      title: "Medical Camp",
      description: "Free health checkup and consultation",
      date: "Quarterly",
      image: "/images/medical-camp.jpg"
    }
  ];

  const funds = [
    {
      category: "Donations",
      amount: "₹2,50,000",
      period: "April 2023"
    },
    {
      category: "Medical Assistance",
      amount: "₹1,75,000",
      period: "April 2023"
    },
    {
      category: "Operational Expenses",
      amount: "₹35,000",
      period: "April 2023"
    }
  ];

  return (
    <div>
      <Head>
        <title>Departments - Athmachaithanya</title>
        <meta name="description" content="Committee members and activities of Athmachaithanya" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Our Departments</h1>
          <p>Learn about our committee members, activities, and financial management</p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="section">
        <div className="container">
          <div className="tabs">
            <button 
              className={activeTab === 'committee' ? 'tab-active' : ''}
              onClick={() => setActiveTab('committee')}
            >
              Committee
            </button>
            <button 
              className={activeTab === 'activities' ? 'tab-active' : ''}
              onClick={() => setActiveTab('activities')}
            >
              Activities
            </button>
            <button 
              className={activeTab === 'funds' ? 'tab-active' : ''}
              onClick={() => setActiveTab('funds')}
            >
              Funds
            </button>
          </div>

          {/* Committee Members */}
          {activeTab === 'committee' && (
            <div className="tab-content">
              <h2>Our Committee Members</h2>
              <div className="committee-grid">
                {committeeMembers.map((member, index) => (
                  <div key={index} className="member-card">
                    <div className="member-image">
                      <Image 
                        src={member.image} 
                        alt={member.name}
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="member-details">
                      <h3>{member.name}</h3>
                      <p className="role">{member.role}</p>
                      <p>{member.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activities */}
          {activeTab === 'activities' && (
            <div className="tab-content">
              <h2>Our Activities</h2>
              <div className="activities-grid">
                {activities.map((activity, index) => (
                  <div key={index} className="activity-card">
                    <div className="activity-image">
                      <Image 
                        src={activity.image} 
                        alt={activity.title}
                        width={300}
                        height={200}
                      />
                    </div>
                    <div className="activity-details">
                      <h3>{activity.title}</h3>
                      <p>{activity.description}</p>
                      <div className="activity-date">
                        <i className="fas fa-calendar"></i>
                        <span>{activity.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Funds */}
          {activeTab === 'funds' && (
            <div className="tab-content">
              <h2>Fund Management</h2>
              <div className="funds-table">
                <div className="table-header">
                  <div>Category</div>
                  <div>Amount</div>
                  <div>Period</div>
                </div>
                {funds.map((fund, index) => (
                  <div key={index} className="table-row">
                    <div>{fund.category}</div>
                    <div>{fund.amount}</div>
                    <div>{fund.period}</div>
                  </div>
                ))}
              </div>
              <div className="funds-summary">
                <h3>Financial Summary</h3>
                <p>We maintain complete transparency in all financial matters. Detailed reports are available for inspection by any donor or well-wisher.</p>
                <button className="btn">Download Full Report</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
