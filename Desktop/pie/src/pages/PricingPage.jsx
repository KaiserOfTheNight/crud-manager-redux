import React, { useState } from 'react';
import { Check, X, Zap, Crown, Rocket, Star, ArrowLeft, Sparkles } from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'trial',
      name: 'Free Trial',
      price: 0,
      originalPrice: null,
      duration: '14 days',
      description: 'Perfect for testing our platform',
      icon: Sparkles,
      color: 'from-emerald-500 to-teal-500',
      popular: false,
      features: [
        'Up to 10 products',
        'Basic analytics dashboard',
      
        '1 admin user',
        'Standard checkout'
      ],
      limitations: [
        'Limited to 10 products',
        'Basic support only',
        'StoreBuilder branding'
      ],
      cta: 'Start Free Trial',
      badge: 'Most Popular'
    },
    {
      id: 'starter',
      name: 'Starter',
      price: billingCycle === 'monthly' ? 29 : 290,
      originalPrice: billingCycle === 'monthly' ? null : 348,
      duration: billingCycle === 'monthly' ? 'per month' : 'per year',
      description: 'Great for small businesses getting started',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      popular: false,
      features: [
        'Up to 100 products',
        'Advanced analytics dashboard',
        'Priority email support',
        'Custom domain',
        'Remove StoreBuilder branding',
        '5 premium themes',
        '2 admin users',
        'Abandoned cart recovery',
        'Basic SEO tools',
        'Social media integration'
      ],
      limitations: [],
      cta: 'Choose Starter',
      savings: billingCycle === 'yearly' ? 'Save $58/year' : null
    },
    {
      id: 'professional',
      name: 'Professional',
      price: billingCycle === 'monthly' ? 79 : 790,
      originalPrice: billingCycle === 'monthly' ? null : 948,
      duration: billingCycle === 'monthly' ? 'per month' : 'per year',
      description: 'Perfect for growing businesses',
      icon: Crown,
      color: 'from-violet-500 to-purple-500',
      popular: true,
      features: [
        'Up to 500 products',
        'Advanced analytics + reports',
        'Live chat support',
        'Multiple custom domains',
        'Advanced SEO tools',
        'All premium themes',
        '5 admin users',
        'Advanced marketing tools',
        'Inventory management',
        'Multi-currency support',
        'Discount codes & promotions',
        'Google Analytics integration'
      ],
      limitations: [],
      cta: 'Choose Professional',
      badge: 'Best Value',
      savings: billingCycle === 'yearly' ? 'Save $158/year' : null
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 199 : 1990,
      originalPrice: billingCycle === 'monthly' ? null : 2388,
      duration: billingCycle === 'monthly' ? 'per month' : 'per year',
      description: 'For large businesses and agencies',
      icon: Rocket,
      color: 'from-orange-500 to-red-500',
      popular: false,
      features: [
        'Unlimited products',
        'White-label solution',
        '24/7 phone support',
        'Dedicated account manager',
        'Custom integrations',
        'API access',
        'Unlimited admin users',
        'Advanced security features',
        'Custom reporting',
        'Multi-store management',
        'Priority feature requests',
        'Custom training sessions'
      ],
      limitations: [],
      cta: 'Contact Sales',
      savings: billingCycle === 'yearly' ? 'Save $398/year' : null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="px-6 py-4 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              StoreBuilder
            </span>
          </div>
          
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Header */}
      <section className="px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {' '}Perfect Plan
            </span>
          </h1>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Start with our free trial, then scale with plans designed for every stage of your business journey.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-full font-semibold transition-all relative ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-xs px-2 py-1 rounded-full text-white font-bold">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className="relative group transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setSelectedPlan(plan.id)}
                onMouseLeave={() => setSelectedPlan(null)}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>{plan.badge}</span>
                    </div>
                  </div>
                )}

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 h-[520px] flex flex-col relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                  
                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="text-center mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        <plan.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                      <p className="text-white/60 text-xs">{plan.description}</p>
                    </div>

                    {/* Pricing */}
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center mb-1">
                        <span className="text-3xl font-bold">${plan.price}</span>
                        {plan.duration && (
                          <span className="text-white/60 ml-1 text-sm">/{plan.duration}</span>
                        )}
                      </div>
                      {plan.originalPrice && (
                        <div className="text-white/50 text-xs">
                          <span className="line-through">${plan.originalPrice}</span>
                          <span className="ml-1 text-emerald-400 font-semibold">
                            {plan.savings}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="flex-1 mb-6">
                      <div className="space-y-2">
                        {plan.features.slice(0, 6).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="text-white/80 text-xs leading-relaxed">{feature}</span>
                          </div>
                        ))}
                        {plan.features.length > 6 && (
                          <div className="text-white/60 text-xs mt-2">
                            +{plan.features.length - 6} more features
                          </div>
                        )}
                        {plan.limitations.map((limitation, limitIndex) => (
                          <div key={limitIndex} className="flex items-start space-x-2">
                            <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                            <span className="text-white/50 text-xs">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button 
                      onClick={() => {
                        if (plan.id === 'trial') {
                          // Navigate to dashboard setup
                          window.location.href = '/dashboard-setup';
                        }
                      }}
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 text-sm ${
                        plan.id === 'trial'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-105 shadow-lg shadow-emerald-500/25'
                          : plan.popular
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 shadow-lg shadow-purple-500/25'
                          : 'bg-white/10 hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I switch plans anytime?</h3>
                <p className="text-white/70">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">What happens after my trial?</h3>
                <p className="text-white/70">Your trial automatically converts to our Starter plan. You can change or cancel anytime before then.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-white/70">Yes, we offer a 30-day money-back guarantee on all paid plans, no questions asked.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Is there setup assistance?</h3>
                <p className="text-white/70">Absolutely! We provide onboarding support for all plans, with dedicated assistance for Enterprise customers.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I use my own domain?</h3>
                <p className="text-white/70">Yes! Custom domains are included with Starter plans and above. We'll help you set it up.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-white/70">We accept all major credit cards, PayPal, and wire transfers for Enterprise customers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Your 
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {' '}Dream Store?
            </span>
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Start your free trial today and see why thousands of entrepreneurs choose StoreBuilder.
          </p>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-emerald-500/25">
            Start Your Free Trial Now
          </button>
          <p className="text-white/60 mt-4 text-sm">
            No credit card required • 14 days free • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              StoreBuilder
            </span>
          </div>
          <p className="text-white/60">&copy; 2025 StoreBuilder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}