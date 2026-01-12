
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const heroRef = useScrollAnimation();
  const socialProofRef = useScrollAnimation();
  const howItWorksRef = useScrollAnimation();
  const exampleRef = useScrollAnimation();
  const giftRef = useScrollAnimation();
  const pricingRef = useScrollAnimation();
  const faqRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();
  const footerRef = useScrollAnimation();

  return (
    <div className="w-full">
      {/* Section 1: Hero */}
      <section 
        ref={heroRef.ref}
        className={`py-16 md:py-24 text-center scroll-animate ${heroRef.isVisible ? 'visible' : ''}`}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight max-w-4xl mx-auto px-4">
          That drawing in the attic?<br />It has a story to tell.
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto px-4 leading-relaxed">
          Upload a drawing — even if it's faded and crinkled — and we'll transform it into a beautiful illustrated storybook you can share.
        </p>
        
        {/* Hero Video */}
        <div className="mb-10 max-w-5xl mx-auto px-4">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full rounded-xl shadow-2xl border-2 border-pacific-cyan/30"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <button
          onClick={onStart}
          className="px-8 py-4 bg-pacific-cyan hover:bg-pacific-cyan/90 text-white rounded-xl font-bold text-lg shadow-lg shadow-pacific-cyan/30 hover:shadow-xl transition-all transform hover:scale-105 border-2 border-blue-slate"
        >
          Create a Storybook
        </button>
      </section>

      {/* Section 2: Social Proof */}
      <section 
        ref={socialProofRef.ref}
        className={`py-16 bg-pacific-cyan/10 scroll-animate ${socialProofRef.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-3xl mx-auto px-4">
          <blockquote className="text-xl md:text-2xl text-slate-700 italic text-center leading-relaxed">
            "I sent my mom a storybook of a drawing I made in 1989. She called me crying. I was crying. Everyone was crying."
          </blockquote>
          <p className="text-center mt-6 text-slate-600 font-semibold">— Sarah, 42</p>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section 
        ref={howItWorksRef.ref}
        className={`py-16 scroll-animate ${howItWorksRef.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`text-center scroll-animate scroll-animate-delay-1 ${howItWorksRef.isVisible ? 'visible' : ''}`}>
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">1. Snap a photo</h3>
              <p className="text-slate-600">Dig out that old drawing. Faded, crinkled, crayon-smeared — all welcome.</p>
            </div>
            <div className={`text-center scroll-animate scroll-animate-delay-2 ${howItWorksRef.isVisible ? 'visible' : ''}`}>
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">2. We find the story</h3>
              <p className="text-slate-600">Our AI imagines a whimsical adventure starring their creation.</p>
            </div>
            <div className={`text-center scroll-animate scroll-animate-delay-3 ${howItWorksRef.isVisible ? 'visible' : ''}`}>
              <div className="text-5xl mb-4">💝</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">3. Share the magic</h3>
              <p className="text-slate-600">Send a beautiful storybook to someone who'll ugly-cry.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Example Storybook */}
      <section 
        ref={exampleRef.ref}
        className={`py-16 bg-slate-50 scroll-animate ${exampleRef.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">See what's possible</h2>
          <p className="text-lg text-slate-600 mb-8">
            Michael drew this dinosaur in 1987. He was 6. His mom found it in the attic and turned it into this.
          </p>
          <div className="bg-white rounded-lg p-8 shadow-xl border-2 border-pacific-cyan/30 mb-8">
            <div className="text-6xl mb-4">🦕</div>
            <p className="text-slate-500 italic">[Interactive storybook preview]</p>
          </div>
          <button
            onClick={onStart}
            className="px-8 py-4 bg-pacific-cyan hover:bg-pacific-cyan/90 text-white rounded-xl font-bold text-lg shadow-lg shadow-pacific-cyan/30 hover:shadow-xl transition-all transform hover:scale-105 border-2 border-blue-slate"
          >
            Make one like this
          </button>
        </div>
      </section>

      {/* Section 5: It's a Gift */}
      <section 
        ref={giftRef.ref as React.RefObject<HTMLElement>}
        className={`py-16 scroll-animate ${giftRef.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-slate-800">The perfect gift for...</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`bg-white p-6 rounded-lg border-2 border-silver shadow-sm scroll-animate scroll-animate-delay-1 ${giftRef.isVisible ? 'visible' : ''}`}>
              <div className="text-3xl mb-2">🎂</div>
              <p className="font-semibold text-slate-800">A milestone birthday</p>
            </div>
            <div className={`bg-white p-6 rounded-lg border-2 border-silver shadow-sm scroll-animate scroll-animate-delay-1 ${giftRef.isVisible ? 'visible' : ''}`}>
              <div className="text-3xl mb-2">💐</div>
              <p className="font-semibold text-slate-800">Mother's Day or Father's Day</p>
            </div>
            <div className={`bg-white p-6 rounded-lg border-2 border-silver shadow-sm scroll-animate scroll-animate-delay-2 ${giftRef.isVisible ? 'visible' : ''}`}>
              <div className="text-3xl mb-2">🎓</div>
              <p className="font-semibold text-slate-800">A graduation (remember when they were small?)</p>
            </div>
            <div className={`bg-white p-6 rounded-lg border-2 border-silver shadow-sm scroll-animate scroll-animate-delay-2 ${giftRef.isVisible ? 'visible' : ''}`}>
              <div className="text-3xl mb-2">😊</div>
              <p className="font-semibold text-slate-800">Just because you found it and it made you smile</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Pricing */}
      <section 
        ref={pricingRef.ref}
        className={`py-16 bg-amber-50/50 scroll-animate ${pricingRef.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800">Share the story</h2>
          <div className="space-y-6">
            <div className={`bg-white rounded-lg shadow-lg border-2 border-pacific-cyan/30 p-8 scroll-animate scroll-animate-delay-1 ${pricingRef.isVisible ? 'visible' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-slate-800">Send a Digital Gift — $5</h3>
              </div>
              <p className="text-slate-600">A beautiful storybook link they can view anytime.</p>
            </div>
            <div className={`bg-white rounded-lg shadow-lg border-2 border-pacific-cyan/30 p-8 scroll-animate scroll-animate-delay-2 ${pricingRef.isVisible ? 'visible' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-slate-800">Send with the Movie — $12</h3>
              </div>
              <p className="text-slate-600">The storybook plus an animated video of the art coming to life.</p>
            </div>
            <div className={`bg-white rounded-lg shadow-lg border-2 border-pacific-cyan/30 p-8 scroll-animate scroll-animate-delay-3 ${pricingRef.isVisible ? 'visible' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-slate-800">Send a Hardcover Book — $35</h3>
              </div>
              <p className="text-slate-600">A printed keepsake delivered to their door. Includes digital storybook and video.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section 
        ref={faqRef.ref}
        className={`py-16 bg-slate-50 scroll-animate ${faqRef.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className={`bg-white p-6 rounded-lg border-2 border-slate-200 shadow-sm scroll-animate scroll-animate-delay-1 ${faqRef.isVisible ? 'visible' : ''}`}>
              <h3 className="font-bold text-lg mb-2 text-slate-800">What kind of drawings work?</h3>
              <p className="text-slate-600">Anything hand-drawn — crayon, marker, pencil, paint. Old and faded is fine. Even crinkled paper. Just snap a photo.</p>
            </div>
            <div className={`bg-white p-6 rounded-lg border-2 border-slate-200 shadow-sm scroll-animate scroll-animate-delay-2 ${faqRef.isVisible ? 'visible' : ''}`}>
              <h3 className="font-bold text-lg mb-2 text-slate-800">How long does it take?</h3>
              <p className="text-slate-600">About 2-3 minutes to create your storybook. The animated video takes a bit longer.</p>
            </div>
            <div className={`bg-white p-6 rounded-lg border-2 border-slate-200 shadow-sm scroll-animate scroll-animate-delay-3 ${faqRef.isVisible ? 'visible' : ''}`}>
              <h3 className="font-bold text-lg mb-2 text-slate-800">Can I edit the story?</h3>
              <p className="text-slate-600">Yes. We generate the story, but you can tweak the character name, setting, and details before sharing.</p>
            </div>
            <div className={`bg-white p-6 rounded-lg border-2 border-slate-200 shadow-sm scroll-animate scroll-animate-delay-1 ${faqRef.isVisible ? 'visible' : ''}`}>
              <h3 className="font-bold text-lg mb-2 text-slate-800">How does the printed book work?</h3>
              <p className="text-slate-600">We print a hardcover book and ship it directly to any address you choose. Perfect for gifting.</p>
            </div>
            <div className={`bg-white p-6 rounded-lg border-2 border-slate-200 shadow-sm scroll-animate scroll-animate-delay-2 ${faqRef.isVisible ? 'visible' : ''}`}>
              <h3 className="font-bold text-lg mb-2 text-slate-800">Is this safe for my photos?</h3>
              <p className="text-slate-600">Your drawings are only used to create your story. We don't share or sell your images.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Final CTA */}
      <section 
        ref={ctaRef.ref}
        className={`py-16 bg-gradient-to-br from-pacific-cyan/20 to-blue-slate/20 scroll-animate ${ctaRef.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800">
            That drawing deserves more than a box in the attic.
          </h2>
          <button
            onClick={onStart}
            className="px-10 py-5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            Bring it to life
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer 
        ref={footerRef.ref}
        className={`py-12 bg-slate-800 text-slate-300 scroll-animate ${footerRef.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Once Upon a Drawing</h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#" className="hover:text-pacific-cyan transition-colors">About</a>
              <span>|</span>
              <a href="#" className="hover:text-pacific-cyan transition-colors">Pricing</a>
              <span>|</span>
              <a href="#" className="hover:text-pacific-cyan transition-colors">Contact</a>
              <span>|</span>
              <a href="#" className="hover:text-pacific-cyan transition-colors">Privacy</a>
              <span>|</span>
              <a href="#" className="hover:text-pacific-cyan transition-colors">Terms</a>
            </div>
          </div>
          <p className="text-center text-sm text-slate-500">
            © 2026 Sweetwater Technologies
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
