import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";

// Constants - moved outside component for better performance
const AVAILABLE_TOPPINGS = [
  "Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara",
  "Soğan", "Domates", "Mısır", "Jalapeno",
  "Sarımsak", "Ananas", "Sucuk", "Zeytin"
];

const SIZE_OPTIONS = [
  { value: "S", label: "Küçük", extraCost: 0 },
  { value: "M", label: "Orta", extraCost: 10 },
  { value: "L", label: "Büyük", extraCost: 25 }
];

const DOUGH_OPTIONS = [
  { value: "ince", label: "İnce" },
  { value: "standart", label: "Standart" },
  { value: "kalin", label: "Kalın" }
];

const INITIAL_FORM = {
  name: "",
  size: "",
  dough: "",
  toppings: [],
  notes: "",
  count: 1
};

const PIZZA_PRICE = 85.50;
const TOPPING_PRICE = 5;
const MIN_NAME_LENGTH = 3;
const MIN_TOPPINGS = 4;
const MAX_TOPPINGS = 10;

const OrderPage = ({ setOrderData }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({ name: "", toppings: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoized calculations for better performance
  const totalPrice = useMemo(() => {
    const sizeExtra = SIZE_OPTIONS.find(size => size.value === form.size)?.extraCost || 0;
    return (PIZZA_PRICE + sizeExtra + form.toppings.length * TOPPING_PRICE) * form.count;
  }, [form.size, form.toppings.length, form.count]);

  const isValid = useMemo(() => {
    const isNameValid = form.name.trim().length >= MIN_NAME_LENGTH;
    const isToppingsValid = form.toppings.length >= MIN_TOPPINGS && form.toppings.length <= MAX_TOPPINGS;
    return isNameValid && isToppingsValid && form.size && form.dough;
  }, [form.name, form.toppings.length, form.size, form.dough]);

  // Optimized validation with useEffect
  useEffect(() => {
    const newErrors = { name: "", toppings: "" };

    if (form.name.trim().length > 0 && form.name.trim().length < MIN_NAME_LENGTH) {
      newErrors.name = `İsim en az ${MIN_NAME_LENGTH} karakter olmalıdır.`;
    }

    if (form.toppings.length > 0) {
      if (form.toppings.length < MIN_TOPPINGS) {
        newErrors.toppings = `En az ${MIN_TOPPINGS} malzeme seçmelisiniz.`;
      } else if (form.toppings.length > MAX_TOPPINGS) {
        newErrors.toppings = `En fazla ${MAX_TOPPINGS} malzeme seçebilirsiniz.`;
      }
    }
    
    setErrors(newErrors);
  }, [form.name, form.toppings.length]);

  // Optimized event handlers with useCallback
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    setForm(prevForm => {
      if (type === "checkbox") {
        const newToppings = checked
          ? [...prevForm.toppings, value]
          : prevForm.toppings.filter(topping => topping !== value);
        return { ...prevForm, toppings: newToppings };
      }
      
      if (type === "number") {
        return { ...prevForm, [name]: parseInt(value) || 1 };
      }
      
      return { ...prevForm, [name]: value };
    });
  }, []);

  const incrementCount = useCallback(() => {
    setForm(prevForm => ({ ...prevForm, count: prevForm.count + 1 }));
  }, []);

  const decrementCount = useCallback(() => {
    setForm(prevForm => ({ 
      ...prevForm, 
      count: prevForm.count > 1 ? prevForm.count - 1 : 1 
    }));
  }, []);
  
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const orderDetails = { 
        ...form, 
        price: totalPrice,
        timestamp: new Date().toISOString()
      };

      // Simulate API call with better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockResponse = {
        id: `order_${Date.now()}`,
        ...orderDetails,
        status: "confirmed",
        estimatedDelivery: "30-45 dakika"
      };
      
      setOrderData(mockResponse);
      navigate("/success");
    } catch (error) {
      console.error("Sipariş hatası:", error);
      // Burada bir hata toast'ı gösterilebilir
    } finally {
      setIsSubmitting(false);
    }
  }, [form, totalPrice, isValid, isSubmitting, navigate, setOrderData]);

  return (
    <div className="order-page">
      {/* Header */}
      <header className="order-header">
        <div className="container">
          <Link to="/" className="logo">
            Teknolojik Yemekler
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/">Anasayfa</Link>
          <span> - </span>
          <span className="active">Sipariş Oluştur</span>
        </div>
      </div>

      <div className="order-content">
        <div className="container">
          {/* Pizza Image */}
          <div className="pizza-image-section">
            <img src="/images/iteration-2-images/pictures/form-banner.png" alt="Position Absolute Acı Pizza" />
          </div>

          {/* Breadcrumb Text */}
          <div className="breadcrumb-text">
            <span>Anasayfa - Seçenekler - </span><strong>Sipariş Oluştur</strong>
          </div>

          {/* Pizza Info */}
          <div className="pizza-info">
            <h1>Position Absolute Acı Pizza</h1>
            <div className="pizza-meta">
              <span className="price">85.50₺</span>
              <div className="rating-section">
                <span className="rating">4.9</span>
                <span className="reviews">(200)</span>
              </div>
            </div>
            <p className="pizza-description">
              Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="order-form">
            {/* Size and Dough Selection */}
            <div className="form-row">
              <div className="form-group size-group">
                <h3>Boyut Seç <span className="required">*</span></h3>
                <div className="size-options">
                  {SIZE_OPTIONS.map(size => (
                    <label key={size.value} className="size-option">
                      <input
                        type="radio"
                        name="size"
                        value={size.value}
                        checked={form.size === size.value}
                        onChange={handleChange} 
                        required 
                      />
                      <span className="size-label">{size.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group dough-group">
                <h3>Hamur Seç <span className="required">*</span></h3>
                <select name="dough" value={form.dough} onChange={handleChange} required>
                  <option value="" disabled>Hamur Kalınlığı</option>
                  {DOUGH_OPTIONS.map(dough => (
                    <option key={dough.value} value={dough.value}>
                      {dough.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Toppings */}
            <div className="form-group toppings-group">
              <h3>Ek Malzemeler</h3>
              <p className="toppings-subtitle">En Fazla 10 malzeme seçebilirsiniz. 5₺</p>
              <div className="toppings-grid">
                {AVAILABLE_TOPPINGS.map(topping => (
                  <label key={topping} className="topping-option">
                    <input
                      type="checkbox"
                      name="toppings"
                      value={topping}
                      checked={form.toppings.includes(topping)}
                      onChange={handleChange}
                      disabled={!form.toppings.includes(topping) && form.toppings.length >= MAX_TOPPINGS}
                    />
                    <span className="topping-checkmark"></span>
                    <span className="topping-name">{topping}</span>
                  </label>
                ))}
              </div>
              {errors.toppings && <p className="error-message">{errors.toppings}</p>}
            </div>

            {/* Name Input */}
            <div className="form-group name-group">
              <h3>İsim <span className="required">*</span></h3>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Lütfen isminizi giriniz"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>

            {/* Order Notes */}
            <div className="form-group notes-group">
              <h3>Sipariş Notu</h3>
              <textarea
                id="notes"
                name="notes"
                placeholder="Siparişine eklemek istediğin bir not var mı?"
                value={form.notes}
                onChange={handleChange}
                rows="3"
              />
            </div>

            {/* Order Summary and Submit */}
            <div className="order-summary-section">
              <div className="quantity-controls">
                <button type="button" className="quantity-btn" onClick={decrementCount}>-</button>
                <span className="quantity">{form.count}</span>
                <button type="button" className="quantity-btn" onClick={incrementCount}>+</button>
              </div>

              <div className="order-summary">
                <h3>Sipariş Toplamı</h3>
                <div className="summary-item">
                  <span>Seçimler</span>
                  <span>{(form.toppings.length * TOPPING_PRICE).toFixed(2)}₺</span>
                </div>
                <div className="summary-total">
                  <span>Toplam</span>
                  <span>{totalPrice.toFixed(2)}₺</span>
                </div>
              </div>

              <button 
                type="submit" 
                className={`order-submit-btn ${isSubmitting ? 'loading' : ''}`}
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? 'SİPARİŞ GÖNDERİLİYOR...' : 'SİPARİŞ VER'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="order-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-left">
              <h3>Teknolojik Yemekler</h3>
              <div className="contact-info">
                <p>📍 341 Londonderry Road, Istanbul Türkiye</p>
                <p>✉️ aciktim@teknolojikyemekler.com</p>
                <p>📞 +90 216 123 45 67</p>
              </div>
            </div>
            <div className="footer-center">
              <h4>Hot Menu</h4>
              <ul>
                <li>Terminal Pizza</li>
                <li>5 Kişilik Hackathlon Pizza</li>
                <li>useEffect Tavuklu Pizza</li>
                <li>Beyaz Console Frosty</li>
                <li>Testler Geçti Mutlu Burger</li>
                <li>Position Absolute Acı Pizza</li>
              </ul>
            </div>
            <div className="footer-right">
              <h4>Instagram</h4>
              <div className="instagram-grid">
                <div className="insta-photo">
                  <img src="/images/iteration-2-images/footer/insta/li-0.png" alt="Instagram post" />
                </div>
                <div className="insta-photo">
                  <img src="/images/iteration-2-images/footer/insta/li-1.png" alt="Instagram post" />
                </div>
                <div className="insta-photo">
                  <img src="/images/iteration-2-images/footer/insta/li-2.png" alt="Instagram post" />
                </div>
                <div className="insta-photo">
                  <img src="/images/iteration-2-images/footer/insta/li-3.png" alt="Instagram post" />
                </div>
                <div className="insta-photo">
                  <img src="/images/iteration-2-images/footer/insta/li-4.png" alt="Instagram post" />
                </div>
                <div className="insta-photo">
                  <img src="/images/iteration-2-images/footer/insta/li-5.png" alt="Instagram post" />
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2023 Teknolojik Yemekler.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrderPage;
