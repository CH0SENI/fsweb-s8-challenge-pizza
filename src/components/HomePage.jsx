import React, { memo } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page-it2">
      {/* Hero Section */}
      <section className="hero-section-it2">
        <div className="hero-content-it2">
          <img src="/images/iteration-1-images/logo.svg" alt="logo" />
          <p className="cursive-text">fırsatı kaçırma</p>
          <h1>
            KOD ACIKTIRIR <br /> PİZZA, DOYURUR
          </h1>
          <Link to="/order">
            <button className="home-button-it2" data-cy="order-btn">ACIKTIM</button>
          </Link>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="main-content-container">
        {/* Icons Bar Section */}
        <section className="icons-bar-section">
          <div className="icon-item">
            <img src="/images/iteration-2-images/icons/1.svg" alt="YENİ! Kore" />
            <p>YENİ! Kore</p>
          </div>
          <div className="icon-item">
            <img src="/images/iteration-2-images/icons/2.svg" alt="Pizza" />
            <p>Pizza</p>
          </div>
          <div className="icon-item">
            <img src="/images/iteration-2-images/icons/3.svg" alt="Burger" />
            <p>Burger</p>
          </div>
          <div className="icon-item">
            <img src="/images/iteration-2-images/icons/4.svg" alt="Kızartmalar" />
            <p>Kızartmalar</p>
          </div>
          <div className="icon-item">
            <img src="/images/iteration-2-images/icons/5.svg" alt="Fast food" />
            <p>Fast food</p>
          </div>
          <div className="icon-item">
            <img src="/images/iteration-2-images/icons/6.svg" alt="Gazlı İçecek" />
            <p>Gazlı İçecek</p>
          </div>
        </section>

        {/* CTA Cards Section */}
        <section className="cta-cards-section">
          <div className="cta-card cta-card-1">
            <div className="cta-text">
              <h3>Özel Lezzetus</h3>
              <p>Position:Absolute Acı Burger</p>
              <Link to="/order">
                <button>SİPARİŞ VER</button>
              </Link>
            </div>
            <img src="/images/iteration-2-images/cta/kart-1.png" alt="Özel Lezzetus" />
          </div>
          <div className="cta-card cta-card-2">
            <h3>Hackathlon Burger Menü</h3>
            <Link to="/order">
              <button>SİPARİŞ VER</button>
            </Link>
          </div>
          <div className="cta-card cta-card-3">
            <h3>
              <span style={{ color: "#CE2829" }}>Çoooook</span> hızlı
            </h3>
            <p>npm gibi kurye</p>
            <Link to="/order">
              <button>SİPARİŞ VER</button>
            </Link>
          </div>
        </section>

        {/* Food Gallery Section */}
        <section className="food-gallery-section">
          <h2 className="cursive-text" style={{ color: "#CE2829" }}>
            en çoph pakettenen menüler
          </h2>
          <h3>Acıktıran Kodlara Doyuran Lezzetler</h3>
          <div className="food-menu">
            <div className="menu-item">
              <img src="/images/iteration-2-images/icons/1.svg" alt="Ramen" />
              <p>Ramen</p>
            </div>
            <div className="menu-item active">
              <img src="/images/iteration-2-images/icons/2.svg" alt="Pizza" />
              <p>Pizza</p>
            </div>
            <div className="menu-item">
              <img src="/images/iteration-2-images/icons/3.svg" alt="Burger" />
              <p>Burger</p>
            </div>
            <div className="menu-item">
              <img src="/images/iteration-2-images/icons/4.svg" alt="French fries" />
              <p>French fries</p>
            </div>
            <div className="menu-item">
              <img src="/images/iteration-2-images/icons/5.svg" alt="Fast food" />
              <p>Fast food</p>
            </div>
            <div className="menu-item">
              <img src="/images/iteration-2-images/icons/6.svg" alt="Soft drinks" />
              <p>Soft drinks</p>
            </div>
          </div>
          <div className="food-images">
            <div className="food-item">
              <img src="/images/iteration-2-images/pictures/food-1.png" alt="Terminal Pizza" />
              <h4>Terminal Pizza</h4>
              <div className="food-item-details">
                <p>4.9</p>
                <p>(200)</p>
                <p>
                  <strong>60₺</strong>
                </p>
              </div>
            </div>
            <div className="food-item">
              <img src="/images/iteration-2-images/pictures/food-2.png" alt="Position Absolute Acı Pizza" />
              <h4>Position Absolute Acı Pizza</h4>
              <div className="food-item-details">
                <p>4.9</p>
                <p>(700)</p>
                <p>
                  <strong>60₺</strong>
                </p>
              </div>
            </div>
            <div className="food-item">
              <img src="/images/iteration-2-images/pictures/food-3.png" alt="useEffect Tavuklu Burger" />
              <h4>useEffect Tavuklu Burger</h4>
              <div className="food-item-details">
                <p>4.9</p>
                <p>(100)</p>
                <p>
                  <strong>60₺</strong>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer-it2">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo-contact">
              <img src="/images/iteration-2-images/footer/logo-footer.svg" alt="logo" />
              <div className="contact-info">
                <p>
                  <img src="/images/iteration-2-images/footer/icons/icon-1.png" alt="location" /> 341 Londonderry Road, Istanbul, Türkiye
                </p>
                <p>
                  <img src="/images/iteration-2-images/footer/icons/icon-2.png" alt="mail" /> aciktim@teknolojikyemekler.com
                </p>
                <p>
                  <img src="/images/iteration-2-images/footer/icons/icon-3.png" alt="phone" /> +90 216 123 45 67
                </p>
              </div>
            </div>
            <div className="footer-menu">
              <h4>Sıccacık Menuler</h4>
              <ul>
                <li>Terminal Pizza</li>
                <li>5 Kişilik Hackathlon Pizza</li>
                <li>useEffect Tavuklu Pizza</li>
                <li>Beyaz Console Frosty</li>
                <li>Testler Geçti Mutlu Burger</li>
                <li>Position Absolute Acı Burger</li>
              </ul>
            </div>
          </div>
          <div className="footer-instagram">
            <h4>Instagram</h4>
            <div className="instagram-images">
              <img src="/images/iteration-2-images/footer/insta/li-0.png" alt="insta-1" />
              <img src="/images/iteration-2-images/footer/insta/li-1.png" alt="insta-2" />
              <img src="/images/iteration-2-images/footer/insta/li-2.png" alt="insta-3" />
              <img src="/images/iteration-2-images/footer/insta/li-3.png" alt="insta-4" />
              <img src="/images/iteration-2-images/footer/insta/li-4.png" alt="insta-5" />
              <img src="/images/iteration-2-images/footer/insta/li-5.png" alt="insta-6" />
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2023 Teknolojik Yemekler.</p>
            <div className="social-icons">
              <img src="/images/iteration-2-images/footer/icons/icon-1.png" alt="social" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default memo(HomePage);
