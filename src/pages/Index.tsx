import { useState } from "react";
import Icon from "@/components/ui/icon";
import EditableText from "@/components/EditableText";

type SoilRow = {
  plant: string; type: string; product: string;
  drainage: string; watering: string; ph: string; tag: string | null;
};

type Guide = { step: string; title: string; desc: string; icon: string; };

const INITIAL_SOIL: SoilRow[] = [
  { plant: "Монстера, филодендрон", type: "Тропические", product: "Умный Грунт «Тропик»", drainage: "Высокий", watering: "1–2 раза в неделю", ph: "5.5–6.5", tag: "bestseller" },
  { plant: "Кактус, суккулент", type: "Суккуленты", product: "Умный Грунт «Пустыня»", drainage: "Очень высокий", watering: "1–2 раза в месяц", ph: "6.0–7.5", tag: null },
  { plant: "Орхидея фаленопсис", type: "Орхидеи", product: "Умный Грунт «Орхид»", drainage: "Максимальный", watering: "Раз в 1–2 недели", ph: "5.5–6.5", tag: "popular" },
  { plant: "Роза, пион, хризантема", type: "Цветущие", product: "Умный Грунт «Цветение»", drainage: "Средний", watering: "3–4 раза в неделю", ph: "6.0–7.0", tag: null },
  { plant: "Томат, перец, огурец", type: "Овощи", product: "Умный Грунт «Урожай»", drainage: "Средний", watering: "Ежедневно", ph: "6.2–7.0", tag: "new" },
  { plant: "Папоротник, хоста", type: "Теневые", product: "Умный Грунт «Тень»", drainage: "Низкий", watering: "2–3 раза в неделю", ph: "5.0–6.5", tag: null },
  { plant: "Бонсай", type: "Бонсай", product: "Умный Грунт «Дзен»", drainage: "Высокий", watering: "По необходимости", ph: "6.0–7.0", tag: "popular" },
];

const INITIAL_GUIDES: Guide[] = [
  { step: "01", title: "Подготовка", desc: "Выберите новый горшок на 2–3 см больше предыдущего. Замочите глиняный горшок в воде на 30 минут — это предотвратит поглощение влаги из грунта.", icon: "Sprout" },
  { step: "02", title: "Извлечение растения", desc: "Аккуратно обожмите горшок со всех сторон. Переверните, придерживая стебель двумя пальцами. Не тяните за стебель — тяните за ком земли.", icon: "Leaf" },
  { step: "03", title: "Осмотр корней", desc: "Очистите корни от старого грунта. Удалите тёмные мягкие корни острым чистым секатором. Здоровые корни — белые или светло-бежевые.", icon: "Search" },
  { step: "04", title: "Подготовка грунта", desc: "Насыпьте слой дренажа 2–3 см. Добавьте Умный Грунт, подходящий для вашего растения. Сформируйте «холмик» по центру.", icon: "Package" },
  { step: "05", title: "Посадка", desc: "Установите растение по центру. Корневая шейка должна быть на 1–2 см ниже края горшка. Равномерно засыпьте грунт, слегка уплотните.", icon: "Flower" },
  { step: "06", title: "Первый полив", desc: "Обильно полейте до появления воды в поддоне. Поставьте в полутень на 1–2 недели — растению нужно время на адаптацию.", icon: "Droplets" },
];

const FILTER_OPTIONS = ["Все типы", "Тропические", "Суккуленты", "Орхидеи", "Цветущие", "Овощи", "Теневые", "Бонсай"];

export default function Index() {
  const [editMode, setEditMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Все типы");
  const [activeNav, setActiveNav] = useState("hero");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  // Editable content state
  const [heroTag, setHeroTag] = useState("Премиальный субстрат · Научный подход");
  const [heroH1, setHeroH1] = useState("Земля, которая думает");
  const [heroDesc, setHeroDesc] = useState("Каждая смесь создана с пониманием биологии конкретного растения. Не просто грунт — экосистема для корней.");
  const [heroCta, setHeroCta] = useState("Подобрать грунт");
  const [heroCtaSecondary, setHeroCtaSecondary] = useState("О бренде");

  const [philoH2, setPhiloH2] = useState("Рождённые из уважения к природе");
  const [philoP1, setPhiloP1] = useState("Умный Грунт появился в 2012 году из неудовлетворённости стандартными субстратами. Основатели — агроном и биолог — задались вопросом: почему грунт для монстеры и кактуса должен быть одинаковым?");
  const [philoP2, setPhiloP2] = useState("Каждая наша смесь — результат многолетних наблюдений за тем, как растения реагируют на pH, аэрацию, влагоёмкость и минеральный баланс. Мы не добавляем ничего лишнего. Только то, что нужно корням.");
  const [philoP3, setPhiloP3] = useState("Философия проста: здоровое растение начинается снизу. С правильной земли. С умного грунта.");
  const [philoQuote, setPhiloQuote] = useState("«Каждый корень заслуживает идеальной почвы»");
  const [philoCity, setPhiloCity] = useState("Москва, с любовью к растениям");

  const [packTitle, setPackTitle] = useState("Детали, которые имеют значение");
  const [packDesc, setPackDesc] = useState("Каждая упаковка Умного Грунта несёт выборочный УФ-лак на логотипе — символ нашей приверженности совершенству. Матовая поверхность контрастирует с глянцевым логотипом, создавая тактильный и визуальный эффект премиального продукта.");

  const [contactPhone, setContactPhone] = useState("8 800 123-45-67");
  const [contactEmail, setContactEmail] = useState("hello@smart-grunt.ru");
  const [contactAddress, setContactAddress] = useState("Москва, ул. Ботаническая, 15, офис 201\nПн–Пт 9:00–18:00");

  const [contactOnline, setContactOnline] = useState("Сайт, Ozon, Wildberries, ВКонтакте-магазин.\nДоставка по России 2–7 дней, Москва — на следующий день.");
  const [contactRetail, setContactRetail] = useState("Более 200 садовых центров и цветочных магазинов по всей России. Найдите ближайший через поиск на карте.");
  const [contactWholesale, setContactWholesale] = useState("Специальные условия для садовых центров, питомников и озеленителей. Напишите нам для обсуждения партнёрства.");

  const [guides, setGuides] = useState<Guide[]>(INITIAL_GUIDES);
  const updateGuide = (i: number, field: keyof Guide, val: string) => {
    setGuides(prev => prev.map((g, idx) => idx === i ? { ...g, [field]: val } : g));
  };

  const [soilData, setSoilData] = useState<SoilRow[]>(INITIAL_SOIL);
  const updateSoil = (i: number, field: keyof SoilRow, val: string) => {
    setSoilData(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: val } : r));
  };

  const filteredSoil = activeFilter === "Все типы"
    ? soilData
    : soilData.filter(s => s.type === activeFilter);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
  };

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const E = (props: {
    value: string; onChange: (v: string) => void;
    className?: string; multiline?: boolean; as?: keyof React.JSX.IntrinsicElements;
  }) => <EditableText {...props} editMode={editMode} />;

  return (
    <div className="min-h-screen bg-background grain relative">

      {/* EDIT MODE TOGGLE */}
      <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-2">
        {editMode && (
          <span className="font-golos text-xs text-olive/80 bg-background/90 border border-olive/30 px-3 py-1.5 backdrop-blur-sm">
            Кликай на любой текст
          </span>
        )}
        <button
          onClick={() => setEditMode(e => !e)}
          className={`flex items-center gap-2 font-golos text-xs tracking-[0.1em] uppercase px-4 py-2.5 border transition-all duration-300 shadow-lg ${
            editMode
              ? "bg-olive text-forest-deep border-olive"
              : "bg-background/90 border-border text-muted-foreground hover:border-olive/50 hover:text-cream backdrop-blur-sm"
          }`}
        >
          <Icon name={editMode ? "Check" : "Pencil"} size={14} />
          {editMode ? "Готово" : "Редактировать"}
        </button>
      </div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-border/40 backdrop-blur-md bg-background/80">
        <button onClick={() => scrollTo("hero")} className="uv-logo">
          <span className="font-cormorant text-xl tracking-[0.2em] text-cream font-light uppercase">
            Умный <span className="text-olive">Грунт</span>
          </span>
        </button>
        <div className="hidden md:flex items-center gap-8">
          {[
            { id: "philosophy", label: "Философия" },
            { id: "table", label: "Подбор грунта" },
            { id: "guides", label: "Гайды" },
            { id: "contact", label: "Контакты" },
          ].map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`nav-link font-golos text-xs tracking-[0.12em] uppercase transition-colors ${
                activeNav === link.id ? "text-olive" : "text-muted-foreground hover:text-cream"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:block font-golos text-xs tracking-[0.15em] uppercase px-5 py-2.5 border border-olive/60 text-olive hover:bg-olive hover:text-forest-deep transition-all duration-300"
        >
          Заказать
        </button>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/79caecdd-a9dc-48f0-bd49-d9d21eb15c8d/files/280bb8dd-ed32-47ce-890f-5f06b15fac56.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pt-28">
          <div className="max-w-2xl">
            <p className="animate-fade-up font-golos text-xs tracking-[0.3em] uppercase text-olive/80 mb-6">
              <E value={heroTag} onChange={setHeroTag} className="font-golos text-xs tracking-[0.3em] uppercase text-olive/80" />
            </p>
            <h1 className="animate-fade-up-delay-1 font-cormorant text-6xl md:text-8xl leading-[0.9] text-cream font-light mb-8">
              <E value={heroH1} onChange={setHeroH1} className="font-cormorant text-6xl md:text-8xl leading-[0.9] text-cream font-light" />
            </h1>
            <p className="animate-fade-up-delay-2 font-golos text-base text-muted-foreground font-light leading-relaxed max-w-md mb-10">
              <E value={heroDesc} onChange={setHeroDesc} multiline className="font-golos text-base text-muted-foreground font-light leading-relaxed" />
            </p>
            <div className="animate-fade-up-delay-3 flex items-center gap-6">
              <button
                onClick={() => scrollTo("table")}
                className="font-golos text-sm tracking-[0.1em] uppercase px-8 py-4 bg-olive text-forest-deep font-medium hover:bg-olive-light transition-all duration-300"
              >
                <E value={heroCta} onChange={setHeroCta} className="font-golos text-sm tracking-[0.1em] uppercase" />
              </button>
              <button
                onClick={() => scrollTo("philosophy")}
                className="font-golos text-sm tracking-[0.1em] text-muted-foreground hover:text-cream transition-colors flex items-center gap-2"
              >
                <E value={heroCtaSecondary} onChange={setHeroCtaSecondary} className="font-golos text-sm" />
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-olive/50" />
          <span className="font-golos text-xs tracking-[0.2em] uppercase text-muted-foreground">Scroll</span>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-border/50 py-8 bg-forest/40">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "7", unit: "линеек", label: "для разных растений" },
              { value: "12", unit: "лет", label: "опыта и исследований" },
              { value: "98%", unit: "", label: "клиентов довольны результатом" },
              { value: "100%", unit: "", label: "натуральный состав" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-cormorant text-4xl text-olive font-light">
                  {stat.value}<span className="text-xl text-olive/60 ml-1">{stat.unit}</span>
                </div>
                <div className="font-golos text-xs text-muted-foreground mt-1 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="philosophy" className="py-32 max-w-7xl mx-auto px-8">
        <div className="section-ornament mb-16">
          <span className="font-golos text-xs tracking-[0.3em] uppercase text-muted-foreground whitespace-nowrap">История и философия</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-cream font-light leading-tight mb-8">
              <E value={philoH2} onChange={setPhiloH2} className="font-cormorant text-5xl md:text-6xl text-cream font-light leading-tight" />
            </h2>
            <div className="space-y-5 text-muted-foreground font-golos font-light leading-relaxed">
              <p><E value={philoP1} onChange={setPhiloP1} multiline className="font-golos text-base text-muted-foreground font-light leading-relaxed" as="span" /></p>
              <p><E value={philoP2} onChange={setPhiloP2} multiline className="font-golos text-base text-muted-foreground font-light leading-relaxed" as="span" /></p>
              <p><E value={philoP3} onChange={setPhiloP3} multiline className="font-golos text-base text-muted-foreground font-light leading-relaxed" as="span" /></p>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="deco-line" />
              <E value={philoCity} onChange={setPhiloCity} className="font-cormorant text-sm italic text-muted-foreground" as="span" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 border border-olive/10 pointer-events-none" />
            <img
              src="https://cdn.poehali.dev/projects/79caecdd-a9dc-48f0-bd49-d9d21eb15c8d/files/2ba4087d-18d3-4406-ba4a-836281f05132.jpg"
              alt="Пересадка растения"
              className="w-full aspect-[4/5] object-cover grayscale-[20%]"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
              <E value={philoQuote} onChange={setPhiloQuote} className="font-cormorant text-lg italic text-cream/70" as="p" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border/50 mt-20">
          {[
            { icon: "FlaskConical", title: "Научная основа", desc: "Формулы разработаны совместно с аграрными лабораториями МГУ" },
            { icon: "Leaf", title: "Только натуральное", desc: "Без синтетических добавок, торф из сертифицированных источников" },
            { icon: "Award", title: "Проверено временем", desc: "12 лет — тысячи здоровых растений в домах наших клиентов" },
          ].map((v, i) => (
            <div key={i} className="bg-card p-8 hover:bg-forest/60 transition-colors duration-300 group">
              <Icon name={v.icon} fallback="Leaf" size={24} className="text-olive mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-cormorant text-xl text-cream mb-2">{v.title}</h3>
              <p className="font-golos text-sm text-muted-foreground font-light leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOIL SELECTOR TABLE */}
      <section id="table" className="py-32 bg-forest/20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="section-ornament mb-6">
            <span className="font-golos text-xs tracking-[0.3em] uppercase text-muted-foreground whitespace-nowrap">Интерактивный подбор</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <h2 className="font-cormorant text-4xl md:text-5xl text-cream font-light">
              Найдите<br />свой грунт
            </h2>
            <p className="font-golos text-sm text-muted-foreground font-light max-w-xs">
              Выберите тип растения — таблица покажет подходящую линейку и условия ухода
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {FILTER_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => setActiveFilter(opt)}
                className={`font-golos text-xs tracking-[0.08em] px-4 py-2 border transition-all duration-200 ${
                  activeFilter === opt
                    ? "border-olive bg-olive text-forest-deep font-medium"
                    : "border-border text-muted-foreground hover:border-olive/50 hover:text-cream"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="font-golos text-xs tracking-[0.15em] uppercase text-muted-foreground text-left py-4 pr-6">Растение</th>
                  <th className="font-golos text-xs tracking-[0.15em] uppercase text-muted-foreground text-left py-4 pr-6">Продукт</th>
                  <th className="font-golos text-xs tracking-[0.15em] uppercase text-muted-foreground text-left py-4 pr-6 hidden md:table-cell">Дренаж</th>
                  <th className="font-golos text-xs tracking-[0.15em] uppercase text-muted-foreground text-left py-4 pr-6 hidden md:table-cell">Полив</th>
                  <th className="font-golos text-xs tracking-[0.15em] uppercase text-muted-foreground text-left py-4">pH</th>
                </tr>
              </thead>
              <tbody>
                {filteredSoil.map((row, i) => {
                  const globalIdx = soilData.indexOf(row);
                  return (
                    <tr key={i} className="soil-row border-b border-border/40">
                      <td className="py-5 pr-6">
                        <div className="font-golos text-sm text-cream font-light">
                          <E value={row.plant} onChange={v => updateSoil(globalIdx, "plant", v)} className="font-golos text-sm text-cream font-light" />
                        </div>
                        <div className="font-golos text-xs text-muted-foreground mt-0.5">{row.type}</div>
                      </td>
                      <td className="py-5 pr-6">
                        <div className="flex items-center gap-2 flex-wrap">
                          <E value={row.product} onChange={v => updateSoil(globalIdx, "product", v)} className="font-golos text-sm text-olive-light" />
                          {row.tag === "bestseller" && <span className="font-golos text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 bg-olive/20 text-olive border border-olive/30">Хит</span>}
                          {row.tag === "popular" && <span className="font-golos text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 bg-gold/10 text-gold border border-gold/30">Популярный</span>}
                          {row.tag === "new" && <span className="font-golos text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 bg-cream/10 text-cream/70 border border-cream/20">Новинка</span>}
                        </div>
                      </td>
                      <td className="py-5 pr-6 hidden md:table-cell">
                        <E value={row.drainage} onChange={v => updateSoil(globalIdx, "drainage", v)} className="font-golos text-sm text-muted-foreground" />
                      </td>
                      <td className="py-5 pr-6 hidden md:table-cell">
                        <E value={row.watering} onChange={v => updateSoil(globalIdx, "watering", v)} className="font-golos text-sm text-muted-foreground" />
                      </td>
                      <td className="py-5">
                        <E value={row.ph} onChange={v => updateSoil(globalIdx, "ph", v)} className="font-cormorant text-base text-cream/70" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex items-center gap-3 text-muted-foreground">
            <Icon name="Info" size={14} className="text-olive/60 shrink-0" />
            <p className="font-golos text-xs leading-relaxed">
              Не нашли своё растение? Напишите нам — подберём индивидуальный состав.
            </p>
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <section id="guides" className="py-32 max-w-7xl mx-auto px-8">
        <div className="section-ornament mb-16">
          <span className="font-golos text-xs tracking-[0.3em] uppercase text-muted-foreground whitespace-nowrap">Пошаговые инструкции</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="font-cormorant text-4xl md:text-5xl text-cream font-light">
            Гид по<br />пересадке
          </h2>
          <p className="font-golos text-sm text-muted-foreground font-light max-w-sm">
            Следуйте шагам — и ваше растение перенесёт пересадку без стресса
            и быстро войдёт в фазу активного роста
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
          {guides.map((g, i) => (
            <div key={i} className="bg-card p-8 hover:bg-forest transition-colors duration-300 group relative overflow-hidden">
              <div className="absolute top-6 right-6 font-cormorant text-5xl text-border/50 group-hover:text-olive/20 transition-colors duration-300 select-none">
                {g.step}
              </div>
              <Icon name={g.icon} fallback="Leaf" size={20} className="text-olive mb-5" />
              <h3 className="font-cormorant text-xl text-cream mb-3">
                <E value={g.title} onChange={v => updateGuide(i, "title", v)} className="font-cormorant text-xl text-cream" />
              </h3>
              <E value={g.desc} onChange={v => updateGuide(i, "desc", v)} multiline className="font-golos text-sm text-muted-foreground font-light leading-relaxed" as="p" />
            </div>
          ))}
        </div>

        <div className="mt-12 border border-olive/20 p-8 bg-forest/20 flex gap-6 items-start">
          <Icon name="Lightbulb" size={20} className="text-gold shrink-0 mt-0.5" />
          <div>
            <h4 className="font-cormorant text-lg text-cream mb-2">Важный совет</h4>
            <p className="font-golos text-sm text-muted-foreground font-light leading-relaxed">
              Лучшее время для пересадки — ранняя весна, когда растение просыпается
              и начинает активно расти. Избегайте пересадки во время цветения
              и в период зимнего покоя.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="py-20 bg-forest/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/79caecdd-a9dc-48f0-bd49-d9d21eb15c8d/files/148af031-ba6e-4a9f-a518-602f482bd01c.jpg"
                alt="Умный Грунт упаковка"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
            </div>
            <div>
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-olive/80 mb-4">Упаковка</p>
              <h2 className="font-cormorant text-4xl text-cream font-light mb-6">
                <E value={packTitle} onChange={setPackTitle} className="font-cormorant text-4xl text-cream font-light" />
              </h2>
              <E value={packDesc} onChange={setPackDesc} multiline className="font-golos text-sm text-muted-foreground font-light leading-relaxed mb-8" as="p" />
              <div className="space-y-4">
                {[
                  "Экологичная крафт-упаковка, 100% перерабатываемая",
                  "Клапан для повторного закрытия",
                  "QR-код с полной информацией о составе",
                  "Доступна в форматах 2л, 5л, 10л и 20л",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-olive mt-2 shrink-0" />
                    <span className="font-golos text-sm text-muted-foreground font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 max-w-7xl mx-auto px-8">
        <div className="section-ornament mb-16">
          <span className="font-golos text-xs tracking-[0.3em] uppercase text-muted-foreground whitespace-nowrap">Связь и доставка</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-cormorant text-4xl md:text-5xl text-cream font-light mb-8">
              Где купить<br />и как получить
            </h2>

            <div className="space-y-8">
              <div className="border-l-2 border-olive/40 pl-6">
                <h3 className="font-cormorant text-xl text-cream mb-2">Онлайн</h3>
                <E value={contactOnline} onChange={setContactOnline} multiline className="font-golos text-sm text-muted-foreground font-light leading-relaxed" as="p" />
              </div>
              <div className="border-l-2 border-olive/40 pl-6">
                <h3 className="font-cormorant text-xl text-cream mb-2">Розница</h3>
                <E value={contactRetail} onChange={setContactRetail} multiline className="font-golos text-sm text-muted-foreground font-light leading-relaxed" as="p" />
              </div>
              <div className="border-l-2 border-olive/40 pl-6">
                <h3 className="font-cormorant text-xl text-cream mb-2">Оптом</h3>
                <E value={contactWholesale} onChange={setContactWholesale} multiline className="font-golos text-sm text-muted-foreground font-light leading-relaxed" as="p" />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <a href={`tel:${contactPhone.replace(/\D/g, "")}`} className="flex items-center gap-2 text-sm font-golos text-muted-foreground hover:text-olive transition-colors">
                  <Icon name="Phone" size={16} className="text-olive" />
                  <E value={contactPhone} onChange={setContactPhone} className="font-golos text-sm text-muted-foreground" />
                </a>
                <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 text-sm font-golos text-muted-foreground hover:text-olive transition-colors">
                  <Icon name="Mail" size={16} className="text-olive" />
                  <E value={contactEmail} onChange={setContactEmail} className="font-golos text-sm text-muted-foreground" />
                </a>
              </div>

              <div className="flex items-start gap-2 text-sm font-golos text-muted-foreground">
                <Icon name="MapPin" size={16} className="text-olive mt-0.5 shrink-0" />
                <E value={contactAddress} onChange={setContactAddress} multiline className="font-golos text-sm text-muted-foreground" as="span" />
              </div>
            </div>
          </div>

          <div className="border border-border/60 p-8 bg-card">
            {formSent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <Icon name="CheckCircle" size={48} className="text-olive mb-4" />
                <h3 className="font-cormorant text-3xl text-cream mb-2">Сообщение отправлено</h3>
                <p className="font-golos text-sm text-muted-foreground font-light">Ответим в течение одного рабочего дня</p>
              </div>
            ) : (
              <>
                <h3 className="font-cormorant text-2xl text-cream mb-6">Написать нам</h3>
                <form onSubmit={handleForm} className="space-y-4">
                  <div>
                    <label className="font-golos text-xs tracking-[0.1em] uppercase text-muted-foreground block mb-2">Имя</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-input border border-border px-4 py-3 font-golos text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-olive/60 transition-colors"
                      placeholder="Ваше имя" />
                  </div>
                  <div>
                    <label className="font-golos text-xs tracking-[0.1em] uppercase text-muted-foreground block mb-2">Email</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-input border border-border px-4 py-3 font-golos text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-olive/60 transition-colors"
                      placeholder="your@email.ru" />
                  </div>
                  <div>
                    <label className="font-golos text-xs tracking-[0.1em] uppercase text-muted-foreground block mb-2">Сообщение</label>
                    <textarea required rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-input border border-border px-4 py-3 font-golos text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-olive/60 transition-colors resize-none"
                      placeholder="Вопрос, предложение или заявка на опт..." />
                  </div>
                  <button type="submit"
                    className="w-full font-golos text-sm tracking-[0.1em] uppercase py-4 bg-olive text-forest-deep font-medium hover:bg-olive-light transition-colors duration-300 mt-2">
                    Отправить сообщение
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 py-10 bg-forest/30">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-lg text-muted-foreground font-light">
            Умный <span className="text-olive">Грунт</span>
          </span>
          <p className="font-golos text-xs text-muted-foreground/60 text-center">
            © 2024 Умный Грунт. Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            {["Telegram", "VK", "Instagram"].map(soc => (
              <a key={soc} href="#" className="font-golos text-xs text-muted-foreground hover:text-olive transition-colors">{soc}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
