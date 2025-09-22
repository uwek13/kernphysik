import java.applet.*;
import java.awt.*;
/**
 * This type was created in VisualAge.
 */
public class Input extends Applet implements java.awt.event.ActionListener {
	private TextField ivjTextField1 = null;
	int       Ergebnis;
	public static String ANTWORT = "Mist";
/**
 * Method to handle events for the ActionListener interface.
 * @param e java.awt.event.ActionEvent
 */
/* WARNING: THIS METHOD WILL BE REGENERATED. */
public void actionPerformed(java.awt.event.ActionEvent e) {
	// user code begin {1}
	// user code end
	if ((e.getSource() == getTextField1()) ) {
		connEtoC1();
	}
	// user code begin {2}
	// user code end
}
/**
 * connEtoC1:  (TextField1.action. --> Input.textField1_ActionEvents()V)
 */
/* WARNING: THIS METHOD WILL BE REGENERATED. */
private void connEtoC1() {
	try {
		// user code begin {1}
		// user code end
		this.textField1_ActionEvents();
		// user code begin {2}
		// user code end
	} catch (java.lang.Throwable ivjExc) {
		// user code begin {3}
		// user code end
		handleException(ivjExc);
	}
}
/**
 * Gets the applet information.
 * @return java.lang.String
 */
public String getAppletInfo() {
	return "Input created using VisualAge for Java by JetSet.";
}
/**
 * Return the TextField1 property value.
 * @return java.awt.TextField
 */
/* WARNING: THIS METHOD WILL BE REGENERATED. */
private TextField getTextField1() {
	if (ivjTextField1 == null) {
		try {
			ivjTextField1 = new java.awt.TextField();
			ivjTextField1.setName("TextField1");
			ivjTextField1.setBounds(5, 3, 150, 23);
			ivjTextField1.setText("Hallo");
			// user code begin {1}
			// user code end
		} catch (java.lang.Throwable ivjExc) {
			// user code begin {2}
			// user code end
			handleException(ivjExc);
		}
	};
	return ivjTextField1;
}
/**
 * Called whenever the part throws an exception.
 * @param exception java.lang.Throwable
 */
private void handleException(Throwable exception) {

	/* Uncomment the following lines to print uncaught exceptions to stdout */
	// System.out.println("--------- UNCAUGHT EXCEPTION ---------");
	// exception.printStackTrace(System.out);
}
/**
 * Handle the Applet init method.
 */
/* WARNING: THIS METHOD WILL BE REGENERATED. */
public void init() {
	super.init();
	try {
		setName("Input");
		setLayout(null);
		setBackground(java.awt.Color.lightGray);
		setSize(188, 29);
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
/**
 * Initializes connections
 */
/* WARNING: THIS METHOD WILL BE REGENERATED. */
private void initConnections() {
	// user code begin {1}
	// user code end
	getTextField1().addActionListener(this);
}
/**
 * main entrypoint - starts the part when it is run as an application
 * @param args java.lang.String[]
 */
public static void main(java.lang.String[] args) {
	try {
		Frame frame;
		try {
			Class aFrameClass = Class.forName("com.ibm.uvm.abt.edit.TestFrame");
			frame = (Frame)aFrameClass.newInstance();
		} catch (java.lang.Throwable ivjExc) {
			frame = new Frame();
		}
		Input aInput;
		Class iiCls = Class.forName("Input");
		ClassLoader iiClsLoader = iiCls.getClassLoader();
		aInput = (Input)java.beans.Beans.instantiate(iiClsLoader,"Input");
		frame.add("Center", aInput);
		frame.setSize(aInput.getSize());
		frame.setVisible(true);
	} catch (Throwable exception) {
		System.err.println("Exception occurred in main() of java.applet.Applet");
		exception.printStackTrace(System.out);
	}
}
   public void paint(Graphics g)
   {
	  g.setColor(Color.black);
	  g.drawRect(160, 3, 23, 23);

	  if (Ergebnis == 1) {
	  g.setColor(Color.green);
	  g.drawLine(164, 7, 172, 22);
	  g.drawLine(172, 22, 179, 11);
	  }
	  if (Ergebnis == 2) {
	  g.setColor(Color.red);
	  g.drawLine(164, 7, 179, 22);
	  g.drawLine(164, 22, 179, 7);
	  }	  
   }            
/**
 * Comment
 */
public void textField1_ActionEvents() {
	ANTWORT = (getParameter("src"));
	if (ivjTextField1.getText().equals (ANTWORT)) {
		ivjTextField1.setText(ivjTextField1.getText());
		Ergebnis = 1;
		repaint();
	}
	else {
		ivjTextField1.setText(ivjTextField1.getText()+"...Nein!");
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