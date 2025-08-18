import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const tutorials = [
	{
		title: "Pemetaan Sampah",
		description:
			"Pelajari cara memetakan dan mengelola persebaran sampah di lingkungan sekitar.",
		icon: "🗺️",
		color: "emerald",
		href: "/tutorial/pemetaan-sampah",
	},
	{
		title: "Ecoenzym",
		description:
			"Temukan cara mengolah sampah organik menjadi cairan multi-fungsi yang ramah lingkungan.",
		icon: "🧪",
		color: "green",
		href: "/tutorial/ecoenzym",
	},
	{
		title: "Paving Plastik",
		description:
			"Pelajari proses daur ulang sampah plastik menjadi paving block yang kuat dan tahan lama.",
		icon: "♻️",
		color: "teal",
		href: "/tutorial/paving-plastik",
	},
];

const Tutorial = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
			<Navbar variant="bg-emerald-800 shadow-lg" variant2="mt-0 py-2" />

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-800 mb-4">
						Tutorial{" "}
						<span className="text-green-600">Eco-Friendly</span>
					</h1>
					<div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto mb-6"></div>
					<p className="text-lg text-gray-700 max-w-2xl mx-auto">
						Pelajari berbagai cara untuk berkontribusi dalam pelestarian
						lingkungan melalui tutorial-tutorial praktis
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{tutorials.map((tutorial, index) => (
						<motion.div
							key={tutorial.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.2 }}
						>
							<Link to={tutorial.href} className="block h-full">
								<div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-100 p-8 h-full hover:shadow-2xl transition-all duration-300 group">
									<div
										className={`w-16 h-16 rounded-full bg-${tutorial.color}-100 flex items-center justify-center text-3xl mb-6`}
									>
										{tutorial.icon}
									</div>

									<h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
										{tutorial.title}
									</h3>

									<p className="text-gray-600 mb-6">
										{tutorial.description}
									</p>

									<div className="flex items-center text-emerald-600 font-semibold group-hover:text-emerald-800">
										Pelajari Sekarang
										<svg
											className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</div>
								</div>
							</Link>
						</motion.div>
					))}
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default Tutorial;
