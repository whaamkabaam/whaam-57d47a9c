
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-whaam-dark py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4 text-whaam-white hover:text-whaam-red hover:bg-whaam-red/10"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Homepage
          </Button>
          
          <h1 className="text-4xl font-bold text-whaam-white mb-4">Terms of Service</h1>
          <p className="text-whaam-white/70">Effective Date: December 2024</p>
        </div>

        <div className="bg-whaam-black/50 rounded-lg shadow-lg p-8 border border-whaam-red/20">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-whaam-red mb-4">Agreement to Terms</h2>
              <div className="text-whaam-white space-y-4">
                <p>By accessing and using WhaamKaBaam services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                <p><strong className="bg-gradient-to-r from-whaam-red via-whaam-yellow to-whaam-red bg-clip-text text-transparent">WhaamKaBaam</strong> provides custom mouse acceleration curve optimization services for gaming.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-whaam-yellow mb-4">Service Description</h2>
              
              <h3 className="text-xl font-semibold text-whaam-red mb-3">What We Provide</h3>
              <p className="text-whaam-white/80 mb-4">
                WhaamKaBaam offers personalized mouse acceleration curves designed to improve gaming performance. Our services include curve customization, revisions, and optional live consultation sessions.
              </p>

              <h3 className="text-xl font-semibold text-whaam-red mb-3">Service Delivery</h3>
              <p className="text-whaam-white/80 mb-4">
                Initial curves are typically delivered within minutes of order completion. Revisions are processed based on your feedback and package selection. Live sessions are scheduled at mutually agreed times.
              </p>

              <h3 className="text-xl font-semibold text-whaam-red mb-3">User Responsibilities</h3>
              <p className="text-whaam-white/80 mb-4">
                You are responsible for providing accurate information about your gaming setup, preferences, and feedback. You must use our services in accordance with game terms of service and applicable laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-whaam-yellow mb-4">Payment and Refunds</h2>
              <div className="text-whaam-white space-y-4">
                <p><strong className="text-whaam-red">100% Satisfaction Guarantee:</strong> If you're not completely satisfied with your custom curve, we offer a full refund within 30 days of delivery.</p>
                <p><strong className="text-whaam-red">Payment Processing:</strong> All payments are processed securely through our payment partners.</p>
                <p><strong className="text-whaam-red">Refund Process:</strong> Refund requests can be submitted via email or Discord. Processing typically takes 3-5 business days.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-whaam-yellow mb-4">Limitation of Liability</h2>
              <div className="text-whaam-white space-y-4">
                <p>WhaamKaBaam services are provided "as is" without warranty. We are not responsible for any game-related consequences of using our curves, including but not limited to account restrictions or performance variations.</p>
                <p>Our total liability is limited to the amount paid for our services.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-whaam-yellow mb-4">Contact</h2>
              <div className="text-whaam-white space-y-2">
                <p>For questions about these Terms of Service, please contact us:</p>
                <p><strong className="text-whaam-red">Email:</strong> hello@whaamkabaam.com</p>
                <p><strong className="text-whaam-red">Discord:</strong> @whaam_kabaam</p>
              </div>
            </div>

            <div className="border-t border-whaam-red/20 pt-6">
              <p className="text-sm text-whaam-white/50">
                Last updated: {new Date().toLocaleDateString('en-US')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
