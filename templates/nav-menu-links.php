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
  <?php
    $menu = menu_navigation_links('navigation');
    print theme('links__navigation', array('links' => $menu));
  ?>
	
</div>