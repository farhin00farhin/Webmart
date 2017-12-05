
using System.Data.SqlClient;
using System.Web.Mvc;

namespace WebMartSite.Controllers
{
    public class SiteController : Controller
    {
        string connectionString = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\WebmartDatabase.mdf;Integrated Security=True";
        public ActionResult Index()
        {
            ViewBag.CustomTitle = "Webmart | Personalise and Customise Your Website";
            ViewBag.CustomDescription = "Providing custom solutions to all your website needs. Design your own website and contact us for a free consultation";
            ViewBag.homeMenuActiveClass = "active";
            return View();
        }

        public ActionResult About()
        {
            ViewBag.CustomTitle = "About Us | Webmart";
            ViewBag.CustomDescription = "Webmart is the place to go for professional website development. Design your own website and contact us for a free consultation";
            ViewBag.aboutMenuActiveClass = "active";
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.CustomTitle = "Contact Our Development Team | Webmart";
            ViewBag.CustomDescription = "Contact one of our web development professionals to make your mark on the world wide web.";
            ViewBag.contactMenuActiveClass = "active";
            return View();
        }

        public ActionResult Features()
        {
            ViewBag.CustomTitle = "Features Available | Webmart";
            ViewBag.CustomDescription = "Hundred of features and custom solution for your next web project. Design your own website and contact us for a free consultation";
            ViewBag.featuresMenuActiveClass = "active";
            return View();
        }

        public ActionResult Pricing()
        {
            ViewBag.CustomTitle = "Pricing Plans | Webmart";
            ViewBag.pricingMenuActiveClass = "active";
            ViewBag.CustomDescription = "Appropriate pricing for all you custom web development. Our range caters from the very basic to the very advanced";
            return View();
        }

        public ActionResult Survey() {
            ViewBag.CustomTitle = "Take a Survey | Webmart";
            ViewBag.CustomDescription = "Take a survey to figuere out your exact needs and which pricing plan is right for you and your needs";
            return View();
        }

        public ActionResult CYO() {
            ViewBag.CustomTitle = "Create You Own Webpage | Webmart";
            ViewBag.CustomDescription = "Design your own website and submit your design to us for a free consultation. Developers are standing by";
            return View();
        }

        //20161010 SA Load the viewdesign page from the id supplied in the url.
        public ActionResult ViewDesign(int designId) {
            //OleDbConnection connection = new OleDbConnection("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=|DataDirectory|\\WebmartDatabase.accdb");

            var connection = new SqlConnection(connectionString);
            using (connection)
            {
                var command = new SqlCommand("SELECT Message FROM Designs WHERE ID=" + designId + "", connection);
                connection.Open();
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    ViewBag.LoadedDesign = reader.GetValue(0).ToString();
                }
            }

            return View();
        }

        //20160917 SA Taking the message from the contact page and storing in the database.
        public ActionResult PostMessage(string email, string message, string name)
        {
            //OleDbConnection connection = new OleDbConnection("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=|DataDirectory|\\WebmartDatabase.accdb");
            var connection = new SqlConnection(connectionString);
            using (connection)
            {
                connection.Open();
                var command = new SqlCommand(string.Format("INSERT INTO Message (Email, SenderName, Message) VALUES ('{0}', '{1}', '{2}')", email, name, message), connection);
                command.ExecuteNonQuery();
            }
            return new HttpStatusCodeResult(200);
        }


        //20160917 SA Taking the message from the contact page and storing in the database.
        public ActionResult PostMessageSignup(string email, string message, string name, string phone, string communicationMethod, string options)
        {
            //OleDbConnection connection = new OleDbConnection("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=|DataDirectory|\\WebmartDatabase.accdb");
            var connection = new SqlConnection(connectionString);
            using (connection)
            {
                connection.Open();
                var command = new SqlCommand(string.Format("INSERT INTO Message (Email, SenderName, Message, Phone, CommunicationMethod, Options) VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}')", email, name, message, phone, communicationMethod, options), connection);
                command.ExecuteNonQuery();
            }
            return new HttpStatusCodeResult(200);
        }

        // 20161007 SA Taking the message that contains all the design html and insert it into the database
        public ActionResult PostHTMLDesign(string email, string message)
        {
            //OleDbConnection connection = new OleDbConnection("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=|DataDirectory|\\WebmartDatabase.accdb");
            var connection = new SqlConnection(connectionString);
            using (connection)
            {
                connection.Open();  
                var command = new SqlCommand(string.Format("INSERT INTO Designs (Email, Message) VALUES ('{0}', '{1}');", email, message), connection);
                command.ExecuteNonQuery();

                //20161010 SA Create a link which the admministrator can paste into their browser to view the design
                command.CommandText = "UPDATE Designs SET Designs.Link = '/ViewDesign?designId=' + convert(varchar(MAX), [Id])";
                command.ExecuteNonQuery();
            }
            return new HttpStatusCodeResult(200);
        }

        // 20160910 SA MVC won't allow easy access to video, so make the video available through an action
        public ActionResult MyVideo()
        {
            return File(Server.MapPath("~/Videos/webmart.mp4"), "video/mp4", "webmart.mp4");
        }
    }
}