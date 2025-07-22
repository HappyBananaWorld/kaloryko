import { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {
  const defaultGoals = {
    water: 2000,
    protein: 100,
    fat: 70,
    carbs: 300,
    calories: 2000,
  };

  const [goals, setGoals] = useState(defaultGoals);
  const [intake, setIntake] = useState({
    water: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    calories: 0,
  });

  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState("");
  const [showGoalModal, setShowGoalModal] = useState(false);

  useEffect(() => {
    const storedGoals = localStorage.getItem("goals");
    const storedIntake = localStorage.getItem("intake");
    if (storedGoals) setGoals(JSON.parse(storedGoals));
    if (storedIntake) setIntake(JSON.parse(storedIntake));

    fetch("/foods.json")
      .then((res) => res.json())
      .then(setFoods);
  }, []);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
    localStorage.setItem("intake", JSON.stringify(intake));
  }, [goals, intake]);

  const updateIntake = (food, qty) => {
    const multiplier = qty / food.amount;
    const added = {
      protein: food.protein * multiplier,
      fat: food.fat * multiplier,
      carbs: food.carbs * multiplier,
      calories: food.calories * multiplier,
    };
    setIntake((prev) => ({
      ...prev,
      protein: prev.protein + added.protein,
      fat: prev.fat + added.fat,
      carbs: prev.carbs + added.carbs,
      calories: prev.calories + added.calories,
    }));
  };

  const handleFoodClick = (food) => {
    const qty = parseFloat(prompt(`چه مقدار ${food.name} مصرف کرده‌اید؟ (${food.unit})`));
    if (!isNaN(qty) && qty > 0) {
      updateIntake(food, qty);
    }
  };

  const handleReset = () => {
    if (confirm("آیا مطمئن هستید که می‌خواهید داده‌های امروز را بازنشانی کنید؟")) {
      setIntake({ water: 0, protein: 0, fat: 0, carbs: 0, calories: 0 });
    }
  };

  const handleGoalSave = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newGoals = Object.fromEntries([...data.entries()].map(([k, v]) => [k, parseFloat(v)]));
    setGoals(newGoals);
    setShowGoalModal(false);
  };

  return (
    <>
      <Head>
        <title>ردیاب تغذیه</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <h2 style={{ textAlign: "center" }}>ردیاب تغذیه</h2>

        <div className="boxes">
          {["water", "protein", "fat", "carbs"].map((key) => (
            <div className="info-box" key={key}>
              <h3>
                {key === "water"
                  ? `آب: ${intake.water} ml`
                  : `${key === "protein" ? "پروتئین" : key === "fat" ? "چربی" : "کربوهیدرات"}: ${
                      Math.round(intake[key])
                    } g`}
              </h3>
              <p>هدف: {goals[key]} {key === "water" ? "ml" : "g"}</p>
            </div>
          ))}
          <div className="info-box">
            <h3>کالری: {Math.round(intake.calories)} kcal</h3>
            <p>هدف: {goals.calories} kcal</p>
          </div>
        </div>

        <div className="buttons">
          <button className="primary" onClick={() => setShowGoalModal(true)}>تنظیم هدف</button>
          <button className="danger" onClick={handleReset}>بازنشانی امروز</button>
        </div>

        <input
          type="text"
          placeholder="جستجوی غذا..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div>
          {foods
            .filter((f) => f.name.includes(query))
            .map((food) => (
              <div className="food-card" key={food.id} onClick={() => handleFoodClick(food)}>
                <h4>{food.name}</h4>
                <p>
                  {food.amount} {food.unit} - کالری: {food.calories}, پروتئین: {food.protein}g، چربی: {food.fat}g، کربوهیدرات: {food.carbs}g
                </p>
              </div>
            ))}
        </div>
      </div>

      {showGoalModal && (
        <div className="modal">
          <form className="modal-content" onSubmit={handleGoalSave}>
            <h3>تنظیم اهداف روزانه</h3>
            <label>آب (ml)</label>
            <input name="water" type="number" defaultValue={goals.water} required />
            <label>پروتئین (g)</label>
            <input name="protein" type="number" defaultValue={goals.protein} required />
            <label>چربی (g)</label>
            <input name="fat" type="number" defaultValue={goals.fat} required />
            <label>کربوهیدرات (g)</label>
            <input name="carbs" type="number" defaultValue={goals.carbs} required />
            <label>کالری (kcal)</label>
            <input name="calories" type="number" defaultValue={goals.calories} required />
            <button className="primary" type="submit">ذخیره</button>
          </form>
        </div>
      )}
    </>
  );
}
