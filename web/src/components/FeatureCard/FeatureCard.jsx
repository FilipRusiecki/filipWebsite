const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6 hover:border-game-accent transition-all duration-300 hover:shadow-lg hover:shadow-game-accent/20">
      {icon && (
        <div className="text-4xl mb-4 text-game-accent">{icon}</div>
      )}
      <h3 className="text-2xl font-bold mb-3 text-game-light">{title}</h3>
      <p className="text-game-light/80 leading-relaxed">{description}</p>
    </div>
  )
}

export default FeatureCard
