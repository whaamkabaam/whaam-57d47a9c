
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
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
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Datenschutzerklärung</h1>
          <p className="text-gray-600">Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 prose prose-lg max-w-none">
          <h2>1. Verantwortlicher</h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
            <strong>Lovable.dev</strong><br />
            E-Mail: hello@lovable.dev<br />
            Discord: @lovable_dev
          </p>

          <h2>2. Allgemeine Hinweise zur Datenverarbeitung</h2>
          <p>
            Der Schutz Ihrer persönlichen Daten ist uns wichtig. Nachfolgend informieren wir Sie ausführlich über den Umgang mit Ihren Daten.
          </p>

          <h2>3. Datenerfassung auf dieser Website</h2>
          <h3>Server-Log-Dateien</h3>
          <p>
            Der Provider der Seiten erhebt und speichert automatisch Informationen in Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt:
          </p>
          <ul>
            <li>Browsertyp und Browserversion</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ul>
          <p>
            Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
          </p>

          <h2>4. Cookies</h2>
          <p>
            Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Wir verwenden nur technisch notwendige Cookies für die Funktionalität der Website.
          </p>

          <h2>5. Externe Dienste</h2>
          <h3>Discord</h3>
          <p>
            Diese Website verlinkt zu unserem Discord-Server. Beim Klick auf Discord-Links werden Sie zu discord.com weitergeleitet. Dort gelten die Datenschutzbestimmungen von Discord Inc.
          </p>

          <h3>Hosting</h3>
          <p>
            Diese Website wird bei Lovable gehostet. Der Anbieter erhebt in sog. Logfiles folgende Daten: IP-Adresse, Referrer-URL, Datum und Uhrzeit der Anfrage, Zeitzonendifferenz zur Greenwich Mean Time, Inhalt der Anforderung, HTTP-Statuscode, übertragene Datenmenge, Website von der die Anforderung kommt und Informationen zu Browser und Betriebssystem.
          </p>

          <h2>6. Ihre Rechte</h2>
          <p>Sie haben folgende Rechte:</p>
          <ul>
            <li><strong>Auskunftsrecht:</strong> Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.</li>
            <li><strong>Berichtigungsrecht:</strong> Sie haben das Recht, unvollständige oder unrichtige Daten berichtigen zu lassen.</li>
            <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer personenbezogenen Daten verlangen.</li>
            <li><strong>Einschränkungsrecht:</strong> Sie haben das Recht, die Einschränkung der Verarbeitung zu verlangen.</li>
            <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung Ihrer Daten widersprechen.</li>
            <li><strong>Datenübertragbarkeit:</strong> Sie haben das Recht auf Datenübertragbarkeit.</li>
          </ul>

          <h2>7. Widerruf von Einwilligungen</h2>
          <p>
            Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
          </p>

          <h2>8. Beschwerderecht bei der zuständigen Aufsichtsbehörde</h2>
          <p>
            Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
          </p>

          <h2>9. SSL- bzw. TLS-Verschlüsselung</h2>
          <p>
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt.
          </p>

          <h2>10. Kontakt</h2>
          <p>
            Bei Fragen zum Datenschutz wenden Sie sich bitte an: hello@lovable.dev
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
