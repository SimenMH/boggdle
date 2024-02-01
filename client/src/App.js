import './css/styles.css';
import Modal from 'react-modal';

import Board from './components/Board.component';
import Header from './components/Header.component';
import { useState } from 'react';

const boardSize = 25;

function App() {
  const [showHelpModal, setShowHelpModal] = useState(true);
  const [showCopyrightModal, setShowCopyrightModal] = useState(false);

  const openHelpModal = () => {
    setShowHelpModal(true);
  };

  const closeHelpModal = () => {
    setShowHelpModal(false);
  };

  const openCopyrightModal = () => {
    setShowCopyrightModal(true);
  };

  const closeCopyrightModal = () => {
    setShowCopyrightModal(false);
  };

  // If invalid board size
  if (Math.sqrt(boardSize) % 1 !== 0) {
    return <div>Square root of board size must be a whole number</div>;
  }
  return (
    <>
      <Modal
        className='Modal Modal__Help'
        overlayClassName='Modal__Overlay'
        isOpen={showHelpModal}
        onRequestClose={closeHelpModal}
        shouldCloseOnOverlayClick={true}
        contentLabel='Help Modal'
        appElement={document.getElementById('root')}
      >
        <h2>How To Play</h2>
        <h3>Find the highest scoring words on the grid in 3 guesses</h3>
        <div className='Modal__Close' onClick={closeHelpModal}></div>
        <ul className='Modal__Tutorial'>
          <li>
            Discover words by swiping across the grid of letters. Letters can be
            swiped horizontally, vertically, or diagonally.
          </li>
          <li>
            Each tile in the grid has a specific value. Accumulate points based
            on the letters you select.
          </li>
          <li>
            Invalid words will be considered as a guess with a score of 0
            points.
          </li>
          <li>
            Words with a length of 6 letters or more earn an extra 5 points. Use
            longer words to boost your score.
          </li>
          <li>
            Your final score is the sum of points from all three attempts.
          </li>
        </ul>

        <p>A new board is released daily at midnight (UTC).</p>
        <p>
          For feedback, bug reports, or other inquiries,{' '}
          <a
            className='Modal__Link'
            href='https://simenmh.com/contact'
            target='_blank'
            rel='noreferrer noopener'
          >
            contact me here.
          </a>
        </p>
        <p>
          The game uses a modified version of the{' '}
          <span
            className='Modal__Link'
            onClick={() => {
              closeHelpModal();
              openCopyrightModal();
            }}
          >
            SCOWL Wordlist
          </span>
        </p>
      </Modal>
      <Modal
        className='Modal Modal__Copyright'
        overlayClassName='Modal__Overlay'
        isOpen={showCopyrightModal}
        onRequestClose={closeCopyrightModal}
        shouldCloseOnOverlayClick={true}
        contentLabel='Copyright Modal'
        appElement={document.getElementById('root')}
      >
        <div className='Modal__Close' onClick={closeCopyrightModal}></div>
        <p>COPYRIGHT, SOURCES, and CREDITS:</p>
        <p>
          The collective work is Copyright 2000-2018 by Kevin Atkinson as well
          <br />
          as any of the copyrights mentioned below:
        </p>
        <p>Copyright 2000-2018 by Kevin Atkinson</p>
        <p>
          Permission to use, copy, modify, distribute and sell these word
          <br /> lists, the associated scripts, the output created from the
          scripts,
          <br /> and its documentation for any purpose is hereby granted without
          fee,
          <br /> provided that the above copyright notice appears in all copies
          and
          <br /> that both that copyright notice and this permission notice
          appear in
          <br /> supporting documentation. Kevin Atkinson makes no
          representations
          <br /> about the suitability of this array for any purpose. It is
          provided
          <br /> "as is" without express or implied warranty.
        </p>
        <p>
          Alan Beale &lt;biljir@pobox.com&gt; also deserves special credit as he
          has,
          <br />
          in addition to providing the 12Dicts package and being a major
          <br />
          contributor to the ENABLE word list, given me an incredible amount of
          <br />
          feedback and created a number of special lists (those found in the
          <br />
          Supplement) in order to help improve the overall quality of SCOWL.
        </p>
        <p>
          The 10 level includes the 1000 most common English words (according to
          <br />
          the Moby (TM) Words II [MWords] package), a subset of the 1000 most
          <br />
          common words on the Internet (again, according to Moby Words II), and
          <br />
          frequently class 16 from Brian Kelk's "UK English Wordlist
          <br />
          with Frequency Classification".
        </p>
        <p>The MWords package was explicitly placed in the public domain:</p>
        <p>
          The Moby lexicon project is complete and has
          <br /> been place into the public domain. Use, sell,
          <br /> rework, excerpt and use in any way on any platform.
        </p>
        <p>
          Placing this material on internal or public servers is
          <br /> also encouraged. The compiler is not aware of any
          <br /> export restrictions so freely distribute world-wide.
        </p>
        <p>You can verify the public domain status by contacting</p>
        <p>
          Grady Ward
          <br /> 3449 Martha Ct.
          <br /> Arcata, CA 95521-4884
        </p>
        <p>
          grady@netcom.com
          <br /> grady@northcoast.com
        </p>
        <p>
          The "UK English Wordlist With Frequency Classification" is also in the
          <br />
          Public Domain:
        </p>
        <p>
          Date: Sat, 08 Jul 2000 20:27:21 +0100
          <br /> From: Brian Kelk &lt;Brian.Kelk@cl.cam.ac.uk&gt;
        </p>
        <p>
          &gt; I was wondering what the copyright status of your "UK English
          <br /> &gt; Wordlist With Frequency Classification" word list as it
          seems to
          <br /> &gt; be lacking any copyright notice.
        </p>
        <p>
          There were many many sources in total, but any text marked
          <br /> "copyright" was avoided. Locally-written documentation was one
          <br /> source. An earlier version of the list resided in a filespace
          called
          <br /> PUBLIC on the University mainframe, because it was considered
          public
          <br /> domain.
        </p>
        <p>Date: Tue, 11 Jul 2000 19:31:34 +0100</p>
        <p>
          &gt; So are you saying your word list is also in the public domain?
        </p>
        <p>That is the intention.</p>
        <p>
          The 20 level includes frequency classes 7-15 from Brian's word list.
        </p>
        <p>
          The 35 level includes frequency classes 2-6 and words appearing in at
          <br />
          least 11 of 12 dictionaries as indicated in the 12Dicts package. All
          <br />
          words from the 12Dicts package have had likely inflections added via
          <br />
          my inflection database.
        </p>
        <p>The 12Dicts package and Supplement is in the Public Domain.</p>
        <p>
          The WordNet database, which was used in the creation of the
          <br />
          Inflections database, is under the following copyright:
        </p>
        <p>
          This software and database is being provided to you, the LICENSEE,
          <br /> by Princeton University under the following license. By
          obtaining,
          <br /> using and/or copying this software and database, you agree that
          you
          <br /> have read, understood, and will comply with these terms and
          <br /> conditions.:
        </p>
        <p>
          Permission to use, copy, modify and distribute this software and
          <br /> database and its documentation for any purpose and without fee
          or
          <br /> royalty is hereby granted, provided that you agree to comply
          with
          <br /> the following copyright notice and statements, including the
          <br /> disclaimer, and that the same appear on ALL copies of the
          software,
          <br /> database and documentation, including modifications that you
          make
          <br /> for internal use or for distribution.
        </p>
        <p>
          WordNet 1.6 Copyright 1997 by Princeton University. All rights
          <br /> reserved.
        </p>
        <p>
          THIS SOFTWARE AND DATABASE IS PROVIDED "AS IS" AND PRINCETON
          <br /> UNIVERSITY MAKES NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR
          <br /> IMPLIED. BY WAY OF EXAMPLE, BUT NOT LIMITATION, PRINCETON
          <br /> UNIVERSITY MAKES NO REPRESENTATIONS OR WARRANTIES OF MERCHANT-
          <br /> ABILITY OR FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE
          OF THE
          <br /> LICENSED SOFTWARE, DATABASE OR DOCUMENTATION WILL NOT INFRINGE
          ANY
          <br /> THIRD PARTY PATENTS, COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.
        </p>
        <p>
          The name of Princeton University or Princeton may not be used in
          <br /> advertising or publicity pertaining to distribution of the
          software
          <br /> and/or database. Title to copyright in this software, database
          and
          <br /> any associated documentation shall at all times remain with
          <br /> Princeton University and LICENSEE agrees to preserve same.
        </p>
        <p>
          The 40 level includes words from Alan's 3esl list found in version 4.0
          <br />
          of his 12dicts package. Like his other stuff the 3esl list is also in
          the
          <br />
          public domain.
        </p>
        <p>
          The 50 level includes Brian's frequency class 1, words appearing
          <br />
          in at least 5 of 12 of the dictionaries as indicated in the 12Dicts
          <br />
          package, and uppercase words in at least 4 of the previous 12
          <br />
          dictionaries. A decent number of proper names is also included: The
          <br />
          top 1000 male, female, and Last names from the 1990 Census report; a
          <br />
          list of names sent to me by Alan Beale; and a few names that I added
          <br />
          myself. Finally a small list of abbreviations not commonly found in
          <br />
          other word lists is included.
        </p>
        <p>
          The name files form the Census report is a government document which I
          <br />
          don't think can be copyrighted.
        </p>
        <p>
          The file special-jargon.50 uses common.lst and word.lst from the
          <br />
          "Unofficial Jargon File Word Lists" which is derived from "The Jargon
          <br />
          File". All of which is in the Public Domain. This file also contain
          <br />a few extra UNIX terms which are found in the file "unix-terms"
          in the
          <br />
          special/ directory.
        </p>
        <p>
          The 55 level includes words from Alan's 2of4brif list found in version
          <br />
          4.0 of his 12dicts package. Like his other stuff the 2of4brif is also
          <br />
          in the public domain.
        </p>
        <p>
          The 60 level includes all words appearing in at least 2 of the 12
          <br />
          dictionaries as indicated by the 12Dicts package.
        </p>
        <p>
          The 70 level includes Brian's frequency class 0 and the 74,550 common
          <br />
          dictionary words from the MWords package. The common dictionary words,
          <br />
          like those from the 12Dicts package, have had all likely inflections
          <br />
          added. The 70 level also included the 5desk list from version 4.0 of
          <br />
          the 12Dics package which is in the public domain.
        </p>
        <p>
          The 80 level includes the ENABLE word list, all the lists in the
          <br />
          ENABLE supplement package (except for ABLE), the "UK Advanced Cryptics
          <br />
          Dictionary" (UKACD), the list of signature words from the YAWL
          package,
          <br />
          and the 10,196 places list from the MWords package.
        </p>
        <p>
          The ENABLE package, mainted by M\Cooper
          &lt;thegrendel@theriver.com&gt;,
          <br />
          is in the Public Domain:
        </p>
        <p>
          The ENABLE master word list, WORD.LST, is herewith formally released
          <br /> into the Public Domain. Anyone is free to use it or distribute
          it in
          <br /> any manner they see fit. No fee or registration is required for
          its
          <br /> use nor are "contributions" solicited (if you feel you
          absolutely
          <br /> must contribute something for your own peace of mind, the
          authors of
          <br /> the ENABLE list ask that you make a donation on their behalf to
          your
          <br /> favorite charity). This word list is our gift to the Scrabble
          <br /> community, as an alternate to "official" word lists. Game
          designers
          <br /> may feel free to incorporate the WORD.LST into their games.
          Please
          <br /> mention the source and credit us as originators of the list.
          Note
          <br /> that if you, as a game designer, use the WORD.LST in your
          product,
          <br /> you may still copyright and protect your product, but you may
          *not*
          <br /> legally copyright or in any way restrict redistribution of the
          <br /> WORD.LST portion of your product. This *may* under law restrict
          your
          <br /> rights to restrict your users' rights, but that is only fair.
        </p>
        <p>
          UKACD, by J Ross Beresford &lt;ross@bryson.demon.co.uk&gt;, is under
          the
          <br />
          following copyright:
        </p>
        <p>Copyright (c) J Ross Beresford 1993-1999. All Rights Reserved.</p>
        <p>
          The following restriction is placed on the use of this publication:
          <br /> if The UK Advanced Cryptics Dictionary is used in a software
          package
          <br /> or redistributed in any form, the copyright notice must be
          <br /> prominently displayed and the text of this document must be
          included
          <br /> verbatim.
        </p>
        <p>
          There are no other restrictions: I would like to see the list
          <br /> distributed as widely as possible.
        </p>
        <p>
          The 95 level includes the 354,984 single words, 256,772 compound
          <br />
          words, 4,946 female names and the 3,897 male names, and 21,986 names
          <br />
          from the MWords package, ABLE.LST from the ENABLE Supplement, and some
          <br />
          additional words found in my part-of-speech database that were not
          <br />
          found anywhere else.
        </p>
        <p>Accent information was taken from UKACD.</p>
        <p>
          The VarCon package was used to create the American, British, Canadian,
          <br />
          and Australian word list. It is under the following copyright:
        </p>
        <p>Copyright 2000-2016 by Kevin Atkinson</p>
        <p>
          Permission to use, copy, modify, distribute and sell this array, the
          <br /> associated software, and its documentation for any purpose is
          hereby
          <br /> granted without fee, provided that the above copyright notice
          appears
          <br /> in all copies and that both that copyright notice and this
          permission
          <br /> notice appear in supporting documentation. Kevin Atkinson makes
          no
          <br /> representations about the suitability of this array for any
          <br /> purpose. It is provided "as is" without express or implied
          warranty.
        </p>
        <p>Copyright 2016 by Benjamin Titze</p>
        <p>
          Permission to use, copy, modify, distribute and sell this array, the
          <br /> associated software, and its documentation for any purpose is
          hereby
          <br /> granted without fee, provided that the above copyright notice
          appears
          <br /> in all copies and that both that copyright notice and this
          permission
          <br /> notice appear in supporting documentation. Benjamin Titze makes
          no
          <br /> representations about the suitability of this array for any
          <br /> purpose. It is provided "as is" without express or implied
          warranty.
        </p>
        <p>Since the original words lists come from the Ispell distribution:</p>
        <p>
          Copyright 1993, Geoff Kuenning, Granada Hills, CA
          <br /> All rights reserved.
        </p>
        <p>
          Redistribution and use in source and binary forms, with or without
          <br /> modification, are permitted provided that the following
          conditions
          <br /> are met:
        </p>
        <p>
          1. Redistributions of source code must retain the above copyright
          <br /> notice, this list of conditions and the following disclaimer.
          <br /> 2. Redistributions in binary form must reproduce the above
          copyright
          <br /> notice, this list of conditions and the following disclaimer in
          the
          <br /> documentation and/or other materials provided with the
          distribution.
          <br /> 3. All modifications to the source code must be clearly marked
          as
          <br /> such. Binary redistributions based on modified source code
          <br /> must be clearly marked as modified versions in the
          documentation
          <br /> and/or other materials provided with the distribution.
          <br /> (clause 4 removed with permission from Geoff Kuenning)
          <br /> 5. The name of Geoff Kuenning may not be used to endorse or
          promote
          <br /> products derived from this software without specific prior
          <br /> written permission.
        </p>
        <p>
          THIS SOFTWARE IS PROVIDED BY GEOFF KUENNING AND CONTRIBUTORS ``AS IS''
          AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
          THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
          PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GEOFF KUENNING OR
          CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
          EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
          PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
          PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
          LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
          NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
          SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
        </p>
      </Modal>
      <Header openHelpModal={() => openHelpModal()} />
      <Board boardSize={boardSize} />
    </>
  );
}

export default App;
