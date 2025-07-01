
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Imprint = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2" size={16} />
            Zurück zur Startseite
          </Button>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Impressum</h1>
          <p className="text-gray-600">Angaben gemäß § 5 TMG</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Verantwortlich für den Inhalt</h2>
              <div className="text-gray-700 space-y-2">
                <p><strong>Lovable.dev</strong></p>
                <p>E-Mail: hello@lovable.dev</p>
                <p>Discord: @lovable_dev</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Haftungsausschluss</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Haftung für Inhalte</h3>
              <p className="text-gray-700 mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Haftung für Links</h3>
              <p className="text-gray-700 mb-4">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Urheberrecht</h3>
              <p className="text-gray-700 mb-4">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Kontakt</h2>
              <div className="text-gray-700 space-y-2">
                <p>Bei Fragen oder Anregungen können Sie uns gerne kontaktieren:</p>
                <p><strong>E-Mail:</strong> hello@lovable.dev</p>
                <p><strong>Discord:</strong> @lovable_dev</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <p className="text-sm text-gray-500">
                Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Imprint;
