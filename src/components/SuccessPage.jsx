import React from "react";

const SuccessPage = ({ orderData }) => {
  if (!orderData) {
    return (
      <div className="success-page">
        <h2>Sipariş Detayları Yükleniyor...</h2>
        <p>Lütfen bekleyin.</p>
      </div>
    );
  }

  return (
    <div className="success-page">
      <h2>Teknolojik Yemekler</h2>
      <h3>lezzetin yolda</h3>
      <h4>SİPARİŞİN ALINDI!</h4>
      <hr />
      <p><strong>İsim:</strong> {orderData.name}</p>
      <p><strong>Boyut:</strong> {orderData.size}</p>
      <p><strong>Malzemeler:</strong> {orderData.toppings.join(", ")}</p>
      <p><strong>Notlar:</strong> {orderData.notes}</p>
    </div>
  );
};

export default SuccessPage;
