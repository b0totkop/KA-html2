using System.Windows;
using System.Windows.Controls;

namespace Szamnegyes.Desktop;

public partial class MainWindow : Window
{
    private int a, b, c, d;
    private int[,] table = new int[3, 3];

    public MainWindow()
    {
        InitializeComponent();
        UpdateTable();
    }

    private void ButtonClick(object sender, RoutedEventArgs e)
    {
        string content = (sender as Button).Content.ToString();
        switch (content)
        {
            case "A": a++; break;
            case "B": b++; break;
            case "C": c++; break;
            case "D": d++; break;
            case "Reset": a = b = c = d = 0; break;
        }
        UpdateTable();
    }

    private void UpdateTable()
    {
        table[0, 0] = a;
        table[0, 2] = b;
        table[2, 0] = c;
        table[2, 2] = d;
        table[0, 1] = a + b;
        table[1, 2] = b + d;
        table[2, 1] = c + d;
        table[1, 0] = a + c;
        table[1, 1] = a + b + c + d;

        Label00.Content = table[0, 0];
        Label01.Content = table[0, 1];
        Label02.Content = table[0, 2];
        Label10.Content = table[1, 0];
        Label11.Content = table[1, 1];
        Label12.Content = table[1, 2];
        Label20.Content = table[2, 0];
        Label21.Content = table[2, 1];
        Label22.Content = table[2, 2];
    }
}