namespace Szamnegyes
{
    public class Table
    {
        public static int[] valid(int[][] table)
        {
            if (table.Length != 3) return [-1];
            if (table[0].Length != 3 || table[1].Length != 3 || table[2].Length != 3) return [-1];

            int a = table[0][0];
            int b = table[0][2];
            int c = table[2][0];
            int d = table[2][2];

            if (a + b != table[0][1]) return [-1];
            if (b + d != table[1][2]) return [-1];
            if (c + d != table[2][1]) return [-1];
            if (a + c != table[1][0]) return [-1];
            if (a + b + c + d != table[1][1]) return [-1];

            return [a, b, c, d];
        }
    }
}