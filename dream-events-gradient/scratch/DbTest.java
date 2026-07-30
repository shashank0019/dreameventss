import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbTest {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://db.kjwfpbsmzlfcqgxoefhh.supabase.co:5432/postgres";
        String user = "postgres";
        
        System.out.println("Testing password: Shashi@193124 ...");
        try (Connection conn = DriverManager.getConnection(url, user, "Shashi@193124")) {
            System.out.println("SUCCESS: Connected with Shashi@193124!");
        } catch (SQLException e) {
            System.out.println("FAILED: " + e.getMessage());
        }
    }
}
