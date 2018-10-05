<div class="float-nav">
  <a href="#" class="menu-btn">
    <ul>
      <li class="line"></li>
      <li class="line"></li>
      <li class="line"></li>
    </ul>
    <div class="menu-txt">menu</div>
  </a>
</div>

<div class="main-nav">
   <!--<ul>
   	<li><a href="/">Home</a></li>
    <li><a href="/events">Events</a></li>
    <li><a href="/directory">People Finder</a></li>
    <li><a href="/map">Campus Map</a></li>
    <li><a href="/student-services">Student Services</a></li>
   </ul>-->
    
    <?php
    $menu = menu_navigation_links('navigation');
	print theme('links__navigation', array('links' => $menu));
	?>
	
</div>