import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
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
            Zurück zur Startseite
          </Button>
          
          <h1 className="text-4xl font-bold text-whaam-white mb-4">Datenschutzerklärung</h1>
          <p className="text-whaam-white/70">Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}</p>
        </div>

        <div className="bg-whaam-black/50 rounded-lg shadow-lg p-8 prose prose-lg max-w-none border border-whaam-red/20">
          <h2 className="text-whaam-red text-2xl font-bold">1. Verantwortlicher</h2>
          <p className="text-whaam-white/80">
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
            <strong className="bg-gradient-to-r from-whaam-red via-whaam-yellow to-whaam-red bg-clip-text text-transparent">WHAAMKABAAM</strong><br />
            E-Mail: hello@whaamkabaam.com<br />
            Discord: @whaam_kabaam
          </p>

          <h2 className="text-whaam-red text-2xl font-bold">2. Allgemeine Hinweise zur Datenverarbeitung</h2>
          <p className="text-whaam-white/80">
            Der Schutz Ihrer persönlichen Daten ist uns wichtig. Nachfolgend informieren wir Sie ausführlich über den Umgang mit Ihren Daten.
          </p>

          <h2 className="text-whaam-red text-2xl font-bold">3. Datenerfassung auf dieser Website</h2>
          <h3 className="text-whaam-yellow text-xl font-semibold">Server-Log-Dateien</h3>
          <p className="text-whaam-white/80">
            Der Provider der Seiten erhebt und speichert automatisch Informationen in Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt:
          </p>
          <ul className="text-whaam-white/80">
            <li>Browsertyp und Browserversion</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ul>
          <p className="text-whaam-white/80">
            Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
          </p>

          <h2 className="text-whaam-red text-2xl font-bold">4. Cookies</h2>
          <p className="text-whaam-white/80">
            Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Wir verwenden nur technisch notwendige Cookies für die Funktionalität der Website.
          </p>

          <h2 className="text-whaam-red text-2xl font-bold">5. Externe Dienste</h2>
          <h3 className="text-whaam-yellow text-xl font-semibold">Discord</h3>
          <p className="text-whaam-white/80">
            Diese Website verlinkt zu unserem Discord-Server. Beim Klick auf Discord-Links werden Sie zu discord.com weitergeleitet. Dort gelten die Datenschutzbestimmungen von Discord Inc.
          </p>

          <h3>Hosting</h3>
          <p className="text-whaam-white/80">
            Diese Website wird bei Lovable gehostet. Der Anbieter erhebt in sog. Logfiles folgende Daten: IP-Adresse, Referrer-URL, Datum und Uhrzeit der Anfrage, Zeitzonendifferenz zur Greenwich Mean Time, Inhalt der Anforderung, HTTP-Statuscode, übertragene Datenmenge, Website von der die Anforderung kommt und Informationen zu Browser und Betriebssystem.
          </p>

          <h2 className="text-whaam-red text-2xl font-bold">6. Ihre Rechte</h2>
          <p className="text-whaam-white/80">Sie haben folgende Rechte:</p>
          <ul className="text-whaam-white/80">
            <li><strong>Auskunftsrecht:</strong> Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.</li>
            <li><strong>Berichtigungsrecht:</strong> Sie haben das Recht, unvollständige oder unrichtige Daten berichtigen zu lassen.</li>
            <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer personenbezogenen Daten verlangen.</li>
            <li><strong>Einschränkungsrecht:</strong> Sie haben das Recht, die Einschränkung der Verarbeitung zu verlangen.</li>
            <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung Ihrer Daten widersprechen.</li>
            <li><strong>Datenübertragbarkeit:</strong> Sie haben das Recht auf Datenübertragbarkeit.</li>
          </ul>

          <h2 className="text-whaam-red text-2xl font-bold">7. Widerruf von Einwilligungen</h2>
          <p className="text-whaam-white/80">
            Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
          </p>

          <h2 className="text-whaam-red text-2xl font-bold">8. Beschwerderecht bei der zuständigen Aufsichtsbehörde</h2>
          <p className="text-whaam-white/80">
            Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
          </p>

          <h2 className="text-whaam-red text-2xl font-bold">9. SSL- bzw. TLS-Verschlüsselung</h2>
          <p className="text-whaam-white/80">
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt.
          </p>

          <h2 className="text-whaam-red text-2xl font-bold">10. Kontakt</h2>
          <p className="text-whaam-white/80">
            Bei Fragen zum Datenschutz wenden Sie sich bitte an: hello@whaamkabaam.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
