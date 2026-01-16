const MatureContentNotice = () => {
  return (
    <section className="py-12 bg-game-dark border-t-2 border-game-accent/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-game-dark border-2 border-game-accent/50 rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-game-accent">
            Mature Content Description
          </h3>
          <p className="text-game-light/90 leading-relaxed">
            Play With Friends contains mild cartoon-style combat, light-hearted references to alcohol, tobacco,
            and fictional "drug" items. Effects are comedic and stylized (screen wobble, movement changes).
            There is no realistic substance use, injury, or gore.
          </p>
        </div>
      </div>
    </section>
  )
}

export default MatureContentNotice
