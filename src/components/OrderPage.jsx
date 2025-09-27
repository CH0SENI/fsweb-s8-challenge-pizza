import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const availableToppings = [
  "Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara",
  "Soğan", "Domates", "Mısır", "Jalapeno",
  "Sarımsak", "Ananas", "Sucuk", "Zeytin"
];

const initialForm = {
  name: "",
  size: "",
  dough: "",
  toppings: [],
  notes: ""
};

const initialErrors = {
  name: "",
  toppings: ""
};

const PIZZA_PRICE = 85.50;
const TOPPING_PRICE = 5;

const OrderPage = ({ setOrderData }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(false);
  const [totalPrice, setTotalPrice] = useState(PIZZA_PRICE);

  useEffect(() => {
    const newTotalPrice = PIZZA_PRICE + form.toppings.length * TOPPING_PRICE;
    setTotalPrice(newTotalPrice);
  }, [form.toppings]);

  useEffect(() => {
    const validateForm = () => {
      const newErrors = { name: "", toppings: "" };
      let isFormValid = true;

      if (form.name.trim().length < 3) {
        newErrors.name = "İsim en az 3 karakter olmalıdır.";
        isFormValid = false;
      } else {
        newErrors.name = "";
      }

      if (form.toppings.length < 4) {
        newErrors.toppings = "En az 4 malzeme seçmelisiniz.";
        isFormValid = false;
      } else if (form.toppings.length > 10) {
        newErrors.toppings = "En fazla 10 malzeme seçebilirsiniz.";
        isFormValid = false;
      } else {
        newErrors.toppings = "";
      }
      
      setErrors(newErrors);
      setIsValid(isFormValid && form.size && form.dough);
    };
    validateForm();
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm(prevForm => ({
        ...prevForm,
        toppings: checked
          ? [...prevForm.toppings, value]
          : prevForm.toppings.filter(topping => topping !== value)
      }));
    } else {
      setForm(prevForm => ({
        ...prevForm,
        [name]: value
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    const orderDetails = { ...form, price: totalPrice };

    axios.post("https://reqres.in/api/pizza", orderDetails)
      .then(response => {
        setOrderData(response.data);
        navigate("/success");
      })
      .catch(error => {
        console.error("Sipariş gönderilirken hata oluştu!", error);
        // Burada kullanıcıya bir hata mesajı gösterebiliriz.
      });
  };

  return (
    <div className="order-page-container">
      <header className="order-header">
        <h1>Teknolojik Yemekler</h1>
        <nav>
          <Link to="/">Anasayfa</Link> - <span className="active">Sipariş Oluştur</span>
        </nav>
      </header>
      <main className="order-main-content">
        <div className="pizza-info">
          <h2>Position Absolute Acı Pizza</h2>
          <div className="pizza-price-rating">
            <span className="price">85.50₺</span>
            <span className="rating">4.9</span>
            <span className="reviews">(200)</span>
          </div>
          <p className="pizza-description">
            Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-groups-container">
            <div className="form-group size-group">
              <h3>Boyut Seç <span className="required">*</span></h3>
              <label>
                <input type="radio" name="size" value="S" checked={form.size === 'S'} onChange={handleChange} required />
                Küçük
              </label>
              <label>
                <input type="radio" name="size" value="M" checked={form.size === 'M'} onChange={handleChange} required />
                Orta
              </label>
              <label>
                <input type="radio" name="size" value="L" checked={form.size === 'L'} onChange={handleChange} required />
                Büyük
              </label>
            </div>

            <div className="form-group dough-group">
              <h3>Hamur Seç <span className="required">*</span></h3>
              <select name="dough" value={form.dough} onChange={handleChange} required>
                <option value="" disabled>Hamur Kalınlığı</option>
                <option value="ince">İnce</option>
                <option value="standart">Standart</option>
                <option value="kalin">Kalın</option>
              </select>
            </div>
          </div>

          <div className="form-group toppings-group">
            <h3>Ek Malzemeler</h3>
            <p>En Fazla 10 malzeme seçebilirsiniz. 5₺</p>
            <div className="toppings-container">
              {availableToppings.map(topping => (
                <label key={topping}>
                  <input
                    type="checkbox"
                    name="toppings"
                    value={topping}
                    checked={form.toppings.includes(topping)}
                    onChange={handleChange}
                  />
                  {topping}
                </label>
              ))}
            </div>
            {errors.toppings && <p className="error">{errors.toppings}</p>}
          </div>

          <div className="form-group name-group">
             <h3>İsim <span className="required">*</span></h3>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Lütfen isminizi girin"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="form-group notes-group">
            <h3>Sipariş Notu</h3>
            <textarea
              id="notes"
              name="notes"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <hr />

          <div className="order-summary-container">
            <div className="order-summary">
              <h3>Sipariş Toplamı</h3>
              <p><span>Seçimler</span> <span>{form.toppings.length * TOPPING_PRICE}₺</span></p>
              <p className="total"><span>Toplam</span> <span>{totalPrice.toFixed(2)}₺</span></p>
            </div>
            <button type="submit" disabled={!isValid}>SİPARİŞ VER</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default OrderPage;
