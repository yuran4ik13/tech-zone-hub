export default async function AboutPage() {
  return (
    <div className="page-wrapper">
      <section className="container about-intro">
        <h1>About Us</h1>
        <p className="lead">
          Welcome to <strong>TechZoneHub</strong> — your go-to online store for
          the latest technology products. We offer high-quality items, fast
          delivery, and friendly customer support. Our team works tirelessly to
          ensure a smooth shopping experience and help customers find the right
          products for their needs. At TechZoneHub, we believe in innovation,
          reliability, and building long-lasting relationships with our
          customers.
        </p>
      </section>

      <section className="container about-content">
        <h2>Who We Are</h2>
        <p>
          <strong>TechZoneHub</strong> is a team of passionate professionals
          dedicated to bringing the latest technology to our customers. We
          combine expertise, creativity, and a customer-first approach to
          provide high-quality products and seamless service. Our focus is on
          innovation, reliability, and making tech shopping simple and enjoyable
          for everyone.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to make technology accessible, reliable, and enjoyable
          for everyone. We strive to offer high-quality products at fair prices,
          ensuring that every customer finds exactly what they need. We aim to
          provide a seamless shopping experience, combining fast delivery,
          excellent support, and easy-to-use services. Above all, we aim to
          build trust and long-lasting relationships with everyone who chooses
          TechZoneHub.
        </p>

        <div className="team-grid">
          <div className="team-card">
            <img
              src="https://files.websitebuilder.prositehosting.co.uk/17/28/1728838a-9079-4956-b2cb-fb8549115b5f.jpg"
              alt="Team"
            />
            <h4>Our Team</h4>
            <p>
              Our team is a group of skilled professionals dedicated to
              delivering top-quality tech solutions. We combine expertise,
              creativity, and a customer-focused approach to ensure every
              project meets the highest standards.
            </p>
          </div>
          <div className="team-card">
            <img
              src="https://as1.ftcdn.net/v2/jpg/03/15/66/40/1000_F_315664059_3U5rIfjwAR5b2rIlJdchwl5JsbE8uljn.jpg"
              alt="Warehouse"
            />
            <h4>Logistics</h4>
            <p>
              Our logistics team ensures fast, reliable, and safe delivery of
              every order. We coordinate every step efficiently, from warehouse
              to doorstep, making sure our customers receive their products on
              time and in perfect condition.
            </p>
          </div>
          <div className="team-card">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=jkl"
              alt="Support"
            />
            <h4>Customer Support</h4>
            <p>
              24/7 friendly support to answer all questions and help our
              customers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
