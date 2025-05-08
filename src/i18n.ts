// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "wallet": "Wallet",
      "language": "EN",
      "account": "Account",
      "balance_trx": "Balance (TRX)",
      "freeze_trx": "Freeze (TRX)",
      "all_trx": "All (TRX)",
      "energy": "Energy",
      "delegable_energy": "Delegable Energy",
      "delegated_energy": "Delegated Energy",
      "bandwidth": "Bandwidth",
      "delegable_bandwidth": "Delegable Bandwidth",
      "delegated_bandwidth": "Delegated Bandwidth",
      "ready_resource": "Ready resource",
      "recovery_24h": "24h Recovery",
      "apy_for_seller": "APY for seller",
      "orders": "Orders",
      "date": "Date",
      "resource": "Resource",
      "price": "Price",
      "payment": "Payment",
      "fulfilled": "Fulfilled",
      "operate": "Operate",
    }
  },
  ja: {
    translation: {
      "wallet": "ウォレット",
      "language": "JA",
      "account": "アカウント",
      "balance_trx": "残高（TRX）",
      "freeze_trx": "凍結（TRX）",
      "all_trx": "全体（TRX）",
      "energy": "エネルギー",
      "delegable_energy": "委任可能なエネルギー",
      "delegated_energy": "委任されたエネルギー",
      "bandwidth": "帯域幅",
      "delegable_bandwidth": "委任可能な帯域幅",
      "delegated_bandwidth": "委任された帯域幅",
      "ready_resource": "利用可能なリソース",
      "recovery_24h": "24時間回復",
      "apy_for_seller": "販売者のAPY",
      "orders": "注文",
      "date": "日付",
      "resource": "リソース",
      "price": "価格",
      "payment": "支払い",
      "fulfilled": "完了",
      "operate": "操作",
    }
  },
  ru: {
    translation: {
      "wallet": "Кошелек",
      "language": "RU",
      "account": "Аккаунт",
      "balance_trx": "Баланс (TRX)",
      "freeze_trx": "Заморозить (TRX)",
      "all_trx": "Все (TRX)",
      "energy": "Энергия",
      "delegable_energy": "Доступная для делегирования энергия",
      "delegated_energy": "Делегированная энергия",
      "bandwidth": "Пропускная способность",
      "delegable_bandwidth": "Доступная для делегирования пропускная способность",
      "delegated_bandwidth": "Делегированная пропускная способность",
      "ready_resource": "Готовый ресурс",
      "recovery_24h": "Восстановление за 24ч",
      "apy_for_seller": "APY для продавца",
      "orders": "Заказы",
      "date": "Дата",
      "resource": "Ресурс",
      "price": "Цена",
      "payment": "Платеж",
      "fulfilled": "Исполнено",
      "operate": "Управлять",
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
