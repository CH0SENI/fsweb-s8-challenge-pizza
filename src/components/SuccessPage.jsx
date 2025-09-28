import React, { useMemo } from "react";

const SuccessPage = ({ orderData }) => {
  // Memoized price calculation
  const orderSummary = useMemo(() => {
    if (!orderData) return null;
    
    const sizePrice = orderData.size === 'S' ? 0 : orderData.size === 'M' ? 10 : 25;
    const basePizza = 85.50;
    const toppingsPrice = orderData.toppings ? orderData.toppings.length * 5 : 0;
    const totalPrice = (basePizza + sizePrice + toppingsPrice) * (orderData.count || 1);
    
    return {
      sizePrice,
      toppingsPrice,
      totalPrice,
      sizeName: orderData.size === 'S' ? 'Küçük' : orderData.size === 'M' ? 'Orta' : 'Büyük'
    };
  }, [orderData]);

  if (!orderData) {
    return (
      <div className="success-page">
        <div className="success-container">
          <div className="loading-state">
            <h2>Sipariş Detayları Yükleniyor...</h2>
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="success-page">
      <div className="success-container">
        {/* Header */}
        <div className="success-header">
          <div className="success-logo">
            <img src="/images/iteration-1-images/logo.svg" alt="Teknolojik Yemekler" />
          </div>
        </div>

        {/* Success Content */}
        <div className="success-content">
          <div className="success-message">
            <h1>lezzetin yolda</h1>
            <h2>SİPARİŞ ALINDI</h2>
            <div className="success-divider"></div>
          </div>

          {/* Pizza Details */}
          <div className="pizza-details">
            <h3>Position Absolute Acı Pizza</h3>
            
            <div className="order-summary">
              <div className="summary-row">
                <span>Boyut:</span>
                <span>{orderSummary.sizeName}</span>
              </div>
              
              <div className="summary-row">
                <span>Hamur:</span>
                <span>{orderData.dough}</span>
              </div>
              
              <div className="summary-row">
                <span>Adet:</span>
                <span>{orderData.count || 1}</span>
              </div>
              
              {orderData.toppings && orderData.toppings.length > 0 && (
                <div className="summary-row">
                  <span>Ek Malzemeler:</span>
                  <span>{orderData.toppings.join(", ")}</span>
                </div>
              )}
              
              {orderData.notes && (
                <div className="summary-row">
                  <span>Notlar:</span>
                  <span>{orderData.notes}</span>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="price-summary">
              <div className="summary-title">Sipariş Toplamı</div>
              
              <div className="price-row">
                <span>Pizza</span>
                <span>85.50₺</span>
              </div>
              
              {orderSummary.sizePrice > 0 && (
                <div className="price-row">
                  <span>Boyut Ekstra</span>
                  <span>{orderSummary.sizePrice.toFixed(2)}₺</span>
                </div>
              )}
              
              {orderSummary.toppingsPrice > 0 && (
                <div className="price-row">
                  <span>Ek Malzemeler ({orderData.toppings?.length || 0} adet)</span>
                  <span>{orderSummary.toppingsPrice.toFixed(2)}₺</span>
                </div>
              )}
              
              {orderData.count > 1 && (
                <div className="price-row">
                  <span>x {orderData.count} adet</span>
                  <span></span>
                </div>
              )}
              
              <div className="price-row total-row">
                <span>Toplam</span>
                <span>{orderSummary.totalPrice.toFixed(2)}₺</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SuccessPage);
