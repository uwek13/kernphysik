import java.applet.*;
import java.awt.*;
public class Inputklein extends Applet implements java.awt.event.ActionListener {
	private TextField ivjTextField1 = null;
	int       Ergebnis;
	public static String ANTWORT = "Antwort";
public void actionPerformed(java.awt.event.ActionEvent e) {
	if ((e.getSource() == getTextField1()) ) {
		connEtoC1();
	}
}
private void connEtoC1() {
	try {
		this.textField1_ActionEvents();
	} catch (java.lang.Throwable ivjExc) {
		handleException(ivjExc);
	}
}
public String getAppletInfo() {
	return "Input created using VisualAge for Java by JetSet.";
}
private TextField getTextField1() {
	if (ivjTextField1 == null) {
		try {
			ivjTextField1 = new java.awt.TextField();
			ivjTextField1.setName("TextField1");
			ivjTextField1.setBounds(3, 0, 100, 20);
			ivjTextField1.setText("");
		} catch (java.lang.Throwable ivjExc) {
			handleException(ivjExc);
		}
	};
	return ivjTextField1;
}
private void handleException(Throwable exception) {
	/* Uncomment the following lines to print uncaught exceptions to stdout */
	// System.out.println("--------- UNCAUGHT EXCEPTION ---------");
	// exception.printStackTrace(System.out);
}
public void init() {
	super.init();
	try {
		setName("Inputklein");
		setLayout(null);
		setBackground(java.awt.Color.lightGray);
		setSize(126, 20);
		add(getTextField1(), getTextField1().getName());
		initConnections();
		// user code begin {1}
		// user code end
	} catch (java.lang.Throwable ivjExc) {
		// user code begin {2}
		// user code end
		handleException(ivjExc);
	}
}
private void initConnections() {
	// user code begin {1}
	// user code end
	getTextField1().addActionListener(this);
}
   public void paint(Graphics g)
   {
	  g.setColor(Color.black);
	  g.drawRect(107, 1, 18, 18);

	  if (Ergebnis == 1) {
	  g.setColor(Color.green);
	  g.drawLine(110, 4, 116, 15);
	  g.drawLine(116, 15, 121, 8);
	  }
	  if (Ergebnis == 2) {
	  g.setColor(Color.red);
	  g.drawLine(110, 4, 121, 15);
	  g.drawLine(110, 15, 121, 4);
	  }	  
   }         
public void textField1_ActionEvents() {
	ANTWORT = (getParameter("src"));
	if (ivjTextField1.getText().equals (ANTWORT)) {
		ivjTextField1.setText(ivjTextField1.getText());
		Ergebnis = 1;
		repaint();
	}
	else {
		ivjTextField1.setText(ivjTextField1.getText()+" Nein!");
		Ergebnis = 2;
		repaint();
	}
	return;
}
   public void update(Graphics g)
   {
	  Image     dbImage;
	  Graphics  dbGraphics;

	  //Double-Buffer initialisieren
	  dbImage = createImage(getSize().width,getSize().height);
	  dbGraphics = dbImage.getGraphics();
	  //Hintergrund löschen
	  dbGraphics.setColor(getBackground());
	  dbGraphics.fillRect(0,0,getSize().width,getSize().height);
	  //Vordergrund zeichnen
	  dbGraphics.setColor(getForeground());
	  paint(dbGraphics);
	  //Offscreen-Image anzeigen
	  g.drawImage(dbImage,0,0,this);
	  dbGraphics.dispose();
   }      
}