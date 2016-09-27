using System.Data.OleDb;
using System.Web.Mvc;

namespace WebMartSite.Controllers
{
    public class SiteController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.CustomTitle = "Webmart | Personalise and Customise Your Website";
            return View();
        }

        public ActionResult About()
        {
            ViewBag.CustomTitle = "Webmart | About Us";
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.CustomTitle = "Webmart | Contact Our Development Team";
            return View();
        }

        public ActionResult Features()
        {
            return View();
        }

        public ActionResult Pricing()
        {
            return View();
        }

        public ActionResult Survey()
        {
            return View();
        }

        // Taking the message from the contact page and storing in the database.
        public ActionResult PostMessage(string email, string message, string name)
        {
            OleDbConnection connection = new OleDbConnection("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=|DataDirectory|\\WebmartDatabase.accdb");
            using (connection)
            {
                connection.Open();
                OleDbCommand command = new OleDbCommand(string.Format("INSERT INTO Message (Email, SenderName, Message) VALUES ('{0}', '{1}', '{2}')", email, name, message), connection);
                command.ExecuteNonQuery();
            }
            return new HttpStatusCodeResult(200);
        }

        public ActionResult MyVideo()
        {
            return File(Server.MapPath("~/Videos/webmart.mp4"), "video/mp4", "webmart.mp4");
        }
    }
}