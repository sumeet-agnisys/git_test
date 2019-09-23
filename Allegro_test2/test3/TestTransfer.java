/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.agnisys.gui;

import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.ClipboardOwner;
import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.StringSelection;
import java.awt.datatransfer.Transferable;
import java.awt.datatransfer.UnsupportedFlavorException;
import java.io.*;
import java.util.List;

public final class TestTransfer implements ClipboardOwner {

    /**
     * Simple test harness.
     */
    public static void main(String... args) throws UnsupportedFlavorException, IOException {
        TestTransfer textTransfer = new TestTransfer();
        List<String> Data = textTransfer.getClipboardContents();
        System.out.println(" Slected Files Path:  " + Data);

//
    }

    /**
     * Empty implementation of the ClipboardOwner interface.
     */
    @Override
    public void lostOwnership(Clipboard clipboard, Transferable contents) {
        //do nothing
    }

    /**
     * Place a String on the clipboard, and make this class the owner of the
     * Clipboard's contents.
     *
     * @param string
     */
    public void setClipboardContents(String string) {
        StringSelection stringSelection = new StringSelection(string);
        Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
        clipboard.setContents(stringSelection, this);
    }

    /**
     * Get the String residing on the clipboard.
     *
     * @return any text found on the Clipboard; if none found, return an empty
     * String.
     * @throws java.awt.datatransfer.UnsupportedFlavorException
     * @throws java.io.IOException
     */
    public List<String> getClipboardContents() throws UnsupportedFlavorException, IOException {
        List<String> result = null;
//        Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
        Clipboard c = Toolkit.getDefaultToolkit().getSystemClipboard();
        if (c.isDataFlavorAvailable(DataFlavor.javaFileListFlavor)) {
            List fileList = (List) c.getData(DataFlavor.javaFileListFlavor);
            try {
                result = fileList;
            } catch (Exception ex) {
                System.out.println(ex);
            }
        } else {
            result = null;
        }

        return result;
    }

    private static void log(String msg) {
        System.out.println(msg);
    }
}
