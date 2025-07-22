"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import styles from "@/styles/style.module.css";

const defaultFoods = [
  // حبوبات
  {
    id: 1,
    name: "نخود پخته",
    unit: "گرم",
    unitAmount: 100,
    calories: 164,
    protein: 8.9,
    fat: 2.6,
    carbs: 27.4,
  },
  {
    id: 2,
    name: "لوبیا قرمز پخته",
    unit: "گرم",
    unitAmount: 100,
    calories: 127,
    protein: 8.7,
    fat: 0.5,
    carbs: 22.8,
  },
  {
    id: 3,
    name: "عدس پخته",
    unit: "گرم",
    unitAmount: 100,
    calories: 116,
    protein: 9,
    fat: 0.4,
    carbs: 20.1,
  },
  {
    id: 4,
    name: "ماش پخته",
    unit: "گرم",
    unitAmount: 100,
    calories: 105,
    protein: 7,
    fat: 0.4,
    carbs: 19.2,
  },

  // غذاهای ایرانی
  {
    id: 5,
    name: "قورمه سبزی",
    unit: "گرم",
    unitAmount: 250,
    calories: 350,
    protein: 18,
    fat: 20,
    carbs: 25,
  },
  {
    id: 6,
    name: "قیمه",
    unit: "گرم",
    unitAmount: 250,
    calories: 320,
    protein: 16,
    fat: 18,
    carbs: 24,
  },
  {
    id: 7,
    name: "کباب کوبیده",
    unit: "گرم",
    unitAmount: 100,
    calories: 220,
    protein: 20,
    fat: 15,
    carbs: 0,
  },
  {
    id: 8,
    name: "زرشک پلو با مرغ",
    unit: "گرم",
    unitAmount: 250,
    calories: 450,
    protein: 25,
    fat: 10,
    carbs: 65,
  },

  // میوه‌جات
  {
    id: 9,
    name: "سیب",
    unit: "عدد",
    unitAmount: 1,
    calories: 95,
    protein: 0.5,
    fat: 0.3,
    carbs: 25,
  },
  {
    id: 10,
    name: "پرتقال",
    unit: "عدد",
    unitAmount: 1,
    calories: 62,
    protein: 1.2,
    fat: 0.2,
    carbs: 15.4,
  },
  {
    id: 11,
    name: "موز",
    unit: "عدد",
    unitAmount: 1,
    calories: 105,
    protein: 1.3,
    fat: 0.4,
    carbs: 27,
  },
  {
    id: 12,
    name: "انگور",
    unit: "گرم",
    unitAmount: 100,
    calories: 69,
    protein: 0.7,
    fat: 0.2,
    carbs: 18,
  },

  // خوراکی‌ها
  {
    id: 13,
    name: "نان سنگک",
    unit: "گرم",
    unitAmount: 100,
    calories: 260,
    protein: 9,
    fat: 1.5,
    carbs: 55,
  },
  {
    id: 14,
    name: "برنج پخته",
    unit: "گرم",
    unitAmount: 100,
    calories: 130,
    protein: 2.7,
    fat: 0.3,
    carbs: 28,
  },
  {
    id: 15,
    name: "ماکارونی پخته",
    unit: "گرم",
    unitAmount: 100,
    calories: 131,
    protein: 5,
    fat: 0.5,
    carbs: 25,
  },
  {
    id: 16,
    name: "سیب زمینی سرخ کرده",
    unit: "گرم",
    unitAmount: 100,
    calories: 312,
    protein: 3.4,
    fat: 14.7,
    carbs: 41.4,
  },

  // لبنیات
  {
    id: 17,
    name: "شیر کم‌چرب",
    unit: "لیوان",
    unitAmount: 240,
    calories: 102,
    protein: 8.2,
    fat: 2.4,
    carbs: 12.2,
  },
  {
    id: 18,
    name: "ماست کم‌چرب",
    unit: "گرم",
    unitAmount: 100,
    calories: 63,
    protein: 5.3,
    fat: 1.6,
    carbs: 7,
  },
  {
    id: 19,
    name: "پنیر فتا",
    unit: "گرم",
    unitAmount: 100,
    calories: 264,
    protein: 14.2,
    fat: 21.3,
    carbs: 4.1,
  },
  {
    id: 20,
    name: "دوغ",
    unit: "لیوان",
    unitAmount: 240,
    calories: 90,
    protein: 6,
    fat: 2,
    carbs: 12,
  },

  // سایر مواد غذایی
  {
    id: 21,
    name: "گوشت گوسفند (ران)",
    unit: "گرم",
    unitAmount: 100,
    calories: 250,
    protein: 25,
    fat: 16,
    carbs: 0,
  },
  {
    id: 22,
    name: "مرغ (سینه، بدون پوست)",
    unit: "گرم",
    unitAmount: 100,
    calories: 165,
    protein: 31,
    fat: 3.6,
    carbs: 0,
  },
  {
    id: 23,
    name: "ماهی قزل‌آلا",
    unit: "گرم",
    unitAmount: 100,
    calories: 206,
    protein: 22.5,
    fat: 12.4,
    carbs: 0,
  },
  {
    id: 24,
    name: "تخم‌مرغ",
    unit: "عدد",
    unitAmount: 1,
    calories: 72,
    protein: 6.3,
    fat: 4.8,
    carbs: 0.6,
  },
];

export default function NutritionTracker() {
  const [metrics, setMetrics] = useState({
    water: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    calories: 0,
  });

  const [goals, setGoals] = useState({
    water: 2000,
    protein: 50,
    fat: 70,
    carbs: 300,
    calories: 2000,
  });

  const [consumedFoods, setConsumedFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [foods] = useState(defaultFoods);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [isTodayModalOpen, setIsTodayModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [tempGoals, setTempGoals] = useState(goals);

  useEffect(() => {
    const savedMetrics = localStorage.getItem("metrics");
    const savedGoals = localStorage.getItem("goals");
    const savedConsumedFoods = localStorage.getItem("consumedFoods");
    if (savedMetrics) setMetrics(JSON.parse(savedMetrics));
    if (savedGoals) setGoals(JSON.parse(savedGoals));
    if (savedConsumedFoods) setConsumedFoods(JSON.parse(savedConsumedFoods));
    document.body.className = styles.darkMode;
  }, []);

  useEffect(() => {
    localStorage.setItem("metrics", JSON.stringify(metrics));
    localStorage.setItem("goals", JSON.stringify(goals));
    localStorage.setItem("consumedFoods", JSON.stringify(consumedFoods));
  }, [metrics, goals, consumedFoods]);

  const handleAddFood = () => {
    if (quantity && !isNaN(quantity) && quantity > 0 && selectedFood) {
      const multiplier = quantity / selectedFood.unitAmount;
      setMetrics((prev) => ({
        ...prev,
        water: prev.water,
        protein: prev.protein + selectedFood.protein * multiplier,
        fat: prev.fat + selectedFood.fat * multiplier,
        carbs: prev.carbs + selectedFood.carbs * multiplier,
        calories: prev.calories + selectedFood.calories * multiplier,
      }));
      setConsumedFoods((prev) => [
        ...prev,
        {
          ...selectedFood,
          quantity: parseFloat(quantity),
          timestamp: new Date().toISOString(),
        },
      ]);
      setIsFoodModalOpen(false);
      setQuantity("");
      setSelectedFood(null);
    }
  };

  const openFoodModal = (food) => {
    setSelectedFood(food);
    setQuantity("");
    setIsFoodModalOpen(true);
  };

  const handleReset = () => {
    setMetrics({ water: 0, protein: 0, fat: 0, carbs: 0, calories: 0 });
    setConsumedFoods([]);
  };

  const handleGoalChange = (e) => {
    setTempGoals({
      ...tempGoals,
      [e.target.name]: parseFloat(e.target.value) || 0,
    });
  };

  const saveGoals = () => {
    setGoals(tempGoals);
    setIsGoalModalOpen(false);
  };

  const adjustWater = (amount) => {
    setMetrics((prev) => ({
      ...prev,
      water: Math.max(0, prev.water + amount),
    }));
  };

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <motion.div
        className={`${styles.container} ${styles.darkMode}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 140 }}
      >
        <motion.h1
          className={styles.title}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 160 }}
        >
          پیگیر تغذیه
        </motion.h1>
        <motion.div
          className={styles.metrics}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            type: "spring",
            stiffness: 140,
          }}
        >
          <motion.div
            className={styles.metricBox}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 140 }}
          >
            <h3>آب</h3>
            <p>{metrics.water.toFixed(1)} میلی‌لیتر</p>
            <p className={styles.goal}>هدف: {goals.water} میلی‌لیتر</p>
            <div className={styles.waterButtons}>
              <motion.button
                onClick={() => adjustWater(250)}
                className={styles.waterButton}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                +۲۵۰
              </motion.button>
              <motion.button
                onClick={() => adjustWater(-250)}
                className={styles.waterButton}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                -۲۵۰
              </motion.button>
            </div>
          </motion.div>
          {["protein", "fat", "carbs"].map((metric, index) => (
            <motion.div
              key={metric}
              className={styles.metricBox}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: (index + 1) * 0.1,
                type: "spring",
                stiffness: 140,
              }}
            >
              <h3>
                {metric === "protein"
                  ? "پروتئین"
                  : metric === "fat"
                  ? "چربی"
                  : "کربوهیدرات"}
              </h3>
              <p>{metrics[metric].toFixed(1)} گرم</p>
              <p className={styles.goal}>هدف: {goals[metric]} گرم</p>
            </motion.div>
          ))}
          <motion.div
            className={styles.metricBox}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 140 }}
          >
            <h3>کالری</h3>
            <p>{metrics.calories.toFixed(0)} کیلوکالری</p>
            <p className={styles.goal}>هدف: {goals.calories} کیلوکالری</p>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 140 }}
        >
          <motion.button
            onClick={() => setIsGoalModalOpen(true)}
            className={styles.button}
            whileHover={{ scale: 1.1, backgroundColor: "#db2777" }}
            whileTap={{ scale: 0.9 }}
          >
            افزودن هدف
          </motion.button>
          <motion.button
            onClick={handleReset}
            className={styles.button}
            whileHover={{ scale: 1.1, backgroundColor: "#db2777" }}
            whileTap={{ scale: 0.9 }}
          >
            بازنشانی امروز
          </motion.button>
          <motion.button
            onClick={() => setIsTodayModalOpen(true)}
            className={styles.button}
            whileHover={{ scale: 1.1, backgroundColor: "#db2777" }}
            whileTap={{ scale: 0.9 }}
          >
            خوردنی‌های امروز
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {isGoalModalOpen && (
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={styles.modalContent}
                initial={{ scale: 0.8, y: 100 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 100 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 160 }}
              >
                <motion.button
                  className={styles.closeButton}
                  onClick={() => setIsGoalModalOpen(false)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  ×
                </motion.button>
                <h2>تنظیم اهداف</h2>
                <div className={styles.modalInputs}>
                  {["water", "protein", "fat", "carbs", "calories"].map(
                    (metric) => (
                      <div key={metric} className={styles.inputWrapper}>
                        <label>
                          {metric === "water"
                            ? "آب"
                            : metric === "protein"
                            ? "پروتئین"
                            : metric === "fat"
                            ? "چربی"
                            : metric === "carbs"
                            ? "کربو"
                            : "کالری"}
                        </label>
                        <input
                          type="number"
                          name={metric}
                          value={tempGoals[metric]}
                          onChange={handleGoalChange}
                          className={styles.input}
                        />
                      </div>
                    )
                  )}
                </div>
                <motion.button
                  onClick={saveGoals}
                  className={styles.button}
                  whileHover={{ scale: 1.1, backgroundColor: "#db2777" }}
                  whileTap={{ scale: 0.9 }}
                >
                  ذخیره
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isFoodModalOpen && selectedFood && (
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={styles.modalContent}
                initial={{ scale: 0.8, y: 100 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 100 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 160 }}
              >
                <motion.button
                  className={styles.closeButton}
                  onClick={() => setIsFoodModalOpen(false)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  ×
                </motion.button>
                <h2>مقدار {selectedFood.name}</h2>
                <label>مقدار ({selectedFood.unit})</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="مقدار"
                  className={styles.input}
                  autoFocus
                />
                <motion.button
                  onClick={handleAddFood}
                  className={styles.button}
                  whileHover={{ scale: 1.1, backgroundColor: "#db2777" }}
                  whileTap={{ scale: 0.9 }}
                >
                  افزودن
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isTodayModalOpen && (
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={styles.modalContent}
                initial={{ scale: 0.8, y: 100 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 100 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 160 }}
              >
                <motion.button
                  className={styles.closeButton}
                  onClick={() => setIsTodayModalOpen(false)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  ×
                </motion.button>
                <h2>خوردنی‌های امروز</h2>
                <div className={styles.foodList}>
                  {consumedFoods.length > 0 ? (
                    consumedFoods.map((food, index) => (
                      <motion.div
                        key={index}
                        className={styles.foodItem}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 140,
                        }}
                      >
                        <span>{food.name}</span>
                        <span>
                          {food.quantity} {food.unit}
                        </span>
                      </motion.div>
                    ))
                  ) : (
                    <p>امروز چیزی نخوردید!</p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.input
          type="text"
          placeholder="جستجوی غذا..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchBar}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 160 }}
        />

        <motion.div
          className={styles.foods}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 140 }}
        >
          {filteredFoods.map((food, index) => (
            <motion.div
              key={food.id}
              className={styles.foodCard}
              onClick={() => openFoodModal(food)}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 140,
              }}
            >
              <h3>{food.name}</h3>
              <p>
                {food.unitAmount} {food.unit}
              </p>
              <p>کالری: {food.calories} کیلوکالری</p>
              <p>پروتئین: {food.protein} گرم</p>
              <p>چربی: {food.fat} گرم</p>
              <p>کربوهیدرات: {food.carbs} گرم</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
